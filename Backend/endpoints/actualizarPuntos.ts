import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { liquidarProduccion } from '../produccion';

const router = express.Router();

// La cantidad de puntos la calcula el servidor a partir de los edificios, mejoras y tiempo transcurrido
const actualizarPuntosHandler: express.RequestHandler = async (req, res) => {
    const idUsuario = (req as any).idUsuario as number;
    const pool = (req as any).db as Pool;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        if (!(await liquidarProduccion(conn, idUsuario))) {
            await conn.rollback();
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        const [usuarios] = await conn.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        await conn.commit();

        res.status(200).json({
            success: true,
            message: 'Puntos actualizados correctamente',
            puntos: usuarios[0].puntos
        });
    } catch (error) {
        await conn.rollback();
        console.error('Error al actualizar puntos:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    } finally {
        conn.release();
    }
};

router.post('/', actualizarPuntosHandler);

export default router;
