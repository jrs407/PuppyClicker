import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import crypto from 'crypto';

const router = express.Router();

const hashPassword = (password: string): string => {
    return crypto
        .createHash('sha256')
        .update(password + 'puppysalt')  // Salt fijo para mayor simplicidad
        .digest('hex');
};

const crearCuentaHandler: express.RequestHandler = async (req, res) => {
    const { usuario, contrasena1, contrasena2 } = req.body as {
        usuario: string;
        contrasena1: string;
        contrasena2: string;
    };
    const pool = (req as any).db as Pool;

    try {
        // Validate passwords match
        if (contrasena1 !== contrasena2) {
            res.status(400).json({
                success: false,
                error: 'Las contraseñas no coinciden'
            });
            return;
        }

        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM Usuario WHERE usuario = ?',
            [usuario]
        );

        if (rows.length > 0) {
            res.status(400).json({
                success: false,
                error: 'El usuario ya existe'
            });
            return;
        }

        const hashedPassword = hashPassword(contrasena1);
        console.log('Creating account with:', {
            usuario,
            originalPassword: contrasena1,
            hashedPassword
        });

        await pool.query(
            'INSERT INTO Usuario (idUsuario, usuario, contrasena, estaEliminado, puntos) VALUES (NULL, ?, ?, 0, 0)',
            [usuario, hashedPassword]
        );

        const [userData] = await pool.query<RowDataPacket[]>(
            'SELECT idUsuario, usuario, puntos FROM Usuario WHERE usuario = ?',
            [usuario]
        );

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            userData: userData[0]
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.post('/', crearCuentaHandler);

export default router;
