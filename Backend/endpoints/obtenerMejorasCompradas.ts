import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';

const router = express.Router();

const obtenerMejorasCompradasHandler: express.RequestHandler = async (req, res) => {
    const { idUsuario } = req.params;
    const pool = (req as any).db as Pool;

    try {
        // Verificar si el usuario existe
        const [userExists] = await pool.query<RowDataPacket[]>(
            'SELECT idUsuario FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        if (userExists.length === 0) {
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        // Obtener mejoras adquiridas
        const [mejoras] = await pool.query<RowDataPacket[]>(
            `SELECT m.*, tm.categoria, tm.nombre as tipoMejora
             FROM Mejoras m
             JOIN TipoMejora tm ON m.TipoMejora_idTipoMejora = tm.idTipoMejora
             JOIN Usuario_has_Mejoras uhm ON m.idMejoras = uhm.Mejoras_idMejoras
             WHERE uhm.Usuario_idUsuario = ?
             ORDER BY m.idMejoras`,
            [idUsuario]
        );

        res.status(200).json({
            success: true,
            mejoras: mejoras
        });

    } catch (error) {
        console.error('Error al obtener mejoras compradas:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.get('/:idUsuario', obtenerMejorasCompradasHandler);

export default router;
