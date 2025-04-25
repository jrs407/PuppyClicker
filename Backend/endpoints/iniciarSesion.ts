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

const iniciarSesionHandler: express.RequestHandler = async (req, res) => {
    const { usuario, contrasena } = req.body as {
        usuario: string;
        contrasena: string;
    };
    const pool = (req as any).db as Pool;

    try {
        const hashedPassword = hashPassword(contrasena);
        console.log('Attempting login with:', { 
            usuario, 
            originalPassword: contrasena,
            hashedPassword 
        });

        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM Usuario WHERE usuario = ? AND contrasena = ?',
            [usuario, hashedPassword]
        );

        console.log('Query results:', rows);

        if (rows.length === 0) {
            // Query the user separately to see if it exists
            const [userCheck] = await pool.query<RowDataPacket[]>(
                'SELECT * FROM Usuario WHERE usuario = ?',
                [usuario]
            );
            
            console.log('User check results:', userCheck);
            
            if (userCheck.length > 0) {
                console.log('La contraseña es incorrecta');
            } else {
                console.log('No existe el usuario');
            }

            res.status(401).json({
                success: false,
                error: 'Usuario o contraseña incorrectos'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso'
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
