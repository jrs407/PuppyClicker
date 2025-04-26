import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import crypto from 'crypto';

const router = express.Router();

const hashPassword = (password: string): string => {
    return crypto
        .createHash('sha256')
        .update(password + 'puppysalt')
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
            'INSERT INTO Usuario (usuario, contrasena, estaEliminado, puntos) VALUES (?, ?, 0, 0)',
            [usuario, hashedPassword]
        );

        const [userData] = await pool.query<RowDataPacket[]>(
            'SELECT idUsuario, usuario, puntos FROM Usuario WHERE usuario = ?',
            [usuario]
        );

        const [edificios] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM Edificios'  // Cambiado para obtener todos los datos de los edificios
        );

        console.log('Número total de edificios en la tabla:', edificios.length);
        console.log('Edificios encontrados:', edificios);

        const userId = userData[0].idUsuario;
        
        // Insertar edificios uno por uno para evitar problemas de sintaxis
        for (const edificio of edificios) {
            await pool.query(
                'INSERT INTO Edificios_has_Usuario (Edificios_idEdificios, Usuario_idUsuario, numeroComprado) VALUES (?, ?, ?)',
                [edificio.idEdificios, userId, 0]
            );
        }

        // Obtener los edificios del usuario recién creado
        const [edificiosUsuario] = await pool.query<RowDataPacket[]>(
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

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            userData: userData[0],
            edificios: edificiosUsuario
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
