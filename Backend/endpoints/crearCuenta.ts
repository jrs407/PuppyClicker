import express from 'express';
import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { generarToken, hashPassword } from '../auth';

const router = express.Router();

const crearCuentaHandler: express.RequestHandler = async (req, res) => {
    const { usuario, contrasena1, contrasena2 } = req.body as {
        usuario: string;
        contrasena1: string;
        contrasena2: string;
    };
    const pool = (req as any).db as Pool;

    if (typeof usuario !== 'string' || typeof contrasena1 !== 'string' || !usuario || !contrasena1) {
        res.status(400).json({
            success: false,
            error: 'Todos los campos son obligatorios'
        });
        return;
    }

    if (contrasena1 !== contrasena2) {
        res.status(400).json({
            success: false,
            error: 'Las contraseñas no coinciden'
        });
        return;
    }

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        const [rows] = await conn.query<RowDataPacket[]>(
            'SELECT idUsuario FROM Usuario WHERE usuario = ?',
            [usuario]
        );

        if (rows.length > 0) {
            await conn.rollback();
            res.status(400).json({
                success: false,
                error: 'El usuario ya existe'
            });
            return;
        }

        const hashedPassword = await hashPassword(contrasena1);

        const [resultado] = await conn.query<ResultSetHeader>(
            'INSERT INTO Usuario (usuario, contrasena, estaEliminado, puntos) VALUES (?, ?, 0, 0)',
            [usuario, hashedPassword]
        );
        const userId = resultado.insertId;

        // Insertar edificios uno por uno para evitar problemas de sintaxis
        const [edificios] = await conn.query<RowDataPacket[]>('SELECT idEdificios FROM Edificios');
        for (const edificio of edificios) {
            await conn.query(
                'INSERT INTO Edificios_has_Usuario (Edificios_idEdificios, Usuario_idUsuario, numeroComprado) VALUES (?, ?, ?)',
                [edificio.idEdificios, userId, 0]
            );
        }

        // Obtener los edificios del usuario recién creado
        const [edificiosUsuario] = await conn.query<RowDataPacket[]>(
            `SELECT
                e.idEdificios,
                e.nombre,
                e.raza,
                e.precioInicial,
                e.produccionInicial,
                CAST(eu.numeroComprado AS SIGNED) as numeroComprado
            FROM Edificios e
            JOIN Edificios_has_Usuario eu ON e.idEdificios = eu.Edificios_idEdificios
            WHERE eu.Usuario_idUsuario = ?
            ORDER BY e.idEdificios`,
            [userId]
        );

        await conn.commit();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            userData: { idUsuario: userId, usuario, puntos: 0 },
            token: generarToken(userId),
            edificios: edificiosUsuario
        });
    } catch (error) {
        await conn.rollback();
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    } finally {
        conn.release();
    }
};

router.post('/', crearCuentaHandler);

export default router;
