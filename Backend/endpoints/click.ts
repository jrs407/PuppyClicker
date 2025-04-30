import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';

const router = express.Router();

const clickHandler: express.RequestHandler = async (req, res) => {
    const { idUsuario, multiplicador } = req.body as {
        idUsuario: number;
        multiplicador: number;
    };
    const pool = (req as any).db as Pool;

    try {
        const [users] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        if (users.length === 0) {
            res.status(401).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        await pool.query(
            'UPDATE Usuario SET puntos = puntos + ? WHERE idUsuario = ?',
            [multiplicador, idUsuario]
        );
        
        res.status(200).json({
            success: true,
            message: 'Click registrado exitosamente'
        });
    } catch (error) {
        console.error('Error al registrar click:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.post('/', clickHandler);

export default router;
