import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { liquidarProduccion } from '../produccion';

const router = express.Router();

const comprarMejoraHandler: express.RequestHandler = async (req, res) => {
    const idUsuario = (req as any).idUsuario as number;
    const { idMejora } = req.body;
    const pool = (req as any).db as Pool;
    const conn = await pool.getConnection();

    try {

        await conn.beginTransaction();

        // Se cobra la producción pendiente antes de que la mejora cambie los multiplicadores.
        // Además bloquea la fila del usuario, así dos compras simultáneas no pueden gastar los mismos puntos
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

        const [mejoras] = await conn.query<RowDataPacket[]>(
            'SELECT precio FROM Mejoras WHERE idMejoras = ?',
            [idMejora]
        );

        if (mejoras.length === 0) {
            await conn.rollback();
            res.status(404).json({
                success: false,
                error: 'Mejora no encontrada'
            });
            return;
        }

        const [yaComprada] = await conn.query<RowDataPacket[]>(
            'SELECT 1 FROM Usuario_has_Mejoras WHERE Usuario_idUsuario = ? AND Mejoras_idMejoras = ?',
            [idUsuario, idMejora]
        );

        if (yaComprada.length > 0) {
            await conn.rollback();
            res.status(400).json({
                success: false,
                error: 'Mejora ya comprada'
            });
            return;
        }

        const puntosUsuario = usuarios[0].puntos;
        const precioMejora = parseInt(mejoras[0].precio);

        if (puntosUsuario < precioMejora) {
            await conn.rollback();
            res.status(400).json({
                success: false,
                error: 'Puntos insuficientes'
            });
            return;
        }


        await conn.query(
            'UPDATE Usuario SET puntos = puntos - ? WHERE idUsuario = ?',
            [precioMejora, idUsuario]
        );


        await conn.query(
            'INSERT INTO Usuario_has_Mejoras (Usuario_idUsuario, Mejoras_idMejoras) VALUES (?, ?)',
            [idUsuario, idMejora]
        );

        const [datosActualizados] = await conn.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        await conn.commit();

        res.status(200).json({
            success: true,
            message: 'Mejora comprada exitosamente',
            puntos: datosActualizados[0].puntos
        });

    } catch (error) {
        await conn.rollback();
        console.error('Error al comprar mejora:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    } finally {
        conn.release();
    }
};

router.post('/', comprarMejoraHandler);

export default router;
