import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { esHashLegacy, generarToken, hashPassword, verificarPassword } from '../auth';

const router = express.Router();

const iniciarSesionHandler: express.RequestHandler = async (req, res) => {
    const { usuario, contrasena } = req.body as {
        usuario: string;
        contrasena: string;
    };
    const pool = (req as any).db as Pool;

    if (typeof usuario !== 'string' || typeof contrasena !== 'string') {
        res.status(400).json({
            success: false,
            error: 'Todos los campos son obligatorios'
        });
        return;
    }

    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT idUsuario, usuario, contrasena, puntos FROM Usuario WHERE usuario = ?',
            [usuario]
        );

        if (rows.length === 0 || !(await verificarPassword(contrasena, rows[0].contrasena))) {
            res.status(401).json({
                success: false,
                error: 'Usuario o contraseña incorrectos'
            });
            return;
        }

        const idUsuario = rows[0].idUsuario;

        // Las cuentas creadas con el hash antiguo se migran a bcrypt en su primer inicio de sesión
        if (esHashLegacy(rows[0].contrasena)) {
            await pool.query(
                'UPDATE Usuario SET contrasena = ? WHERE idUsuario = ?',
                [await hashPassword(contrasena), idUsuario]
            );
        }

        // La producción solo se acumula mientras se juega: se reinicia el contador al entrar
        await pool.query(
            'UPDATE Usuario SET ultimaActualizacion = NOW(3) WHERE idUsuario = ?',
            [idUsuario]
        );

        const userData = {
            idUsuario,
            usuario: rows[0].usuario,
            puntos: rows[0].puntos
        };

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            userData: userData,
            token: generarToken(idUsuario)
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }

}

router.post('/', iniciarSesionHandler);

export default router;
