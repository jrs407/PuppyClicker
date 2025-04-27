import express from 'express';
import { Pool } from 'mysql2/promise';

const router = express.Router();

const actualizarPuntosHandler: express.RequestHandler = async (req, res) => {
    const { idUsuario, puntos } = req.body;
    const pool = (req as any).db as Pool;

    try {
        await pool.query(
            'UPDATE Usuario SET puntos = puntos + ? WHERE idUsuario = ?',
            [puntos, idUsuario]
        );

        res.status(200).json({
            success: true,
            message: 'Puntos actualizados correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar puntos:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.post('/', actualizarPuntosHandler);

export default router;
