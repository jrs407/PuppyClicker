import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';

const router = express.Router();

const comprarMejoraHandler: express.RequestHandler = async (req, res) => {
    const { idUsuario, idMejora } = req.body;
    const pool = (req as any).db as Pool;

    try {

        await pool.query('START TRANSACTION');


        const [usuarios] = await pool.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        const [mejoras] = await pool.query<RowDataPacket[]>(
            'SELECT precio FROM Mejoras WHERE idMejoras = ?',
            [idMejora]
        );

        if (usuarios.length === 0) {
            await pool.query('ROLLBACK');
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        if (mejoras.length === 0) {
            await pool.query('ROLLBACK');
            res.status(404).json({
                success: false,
                error: 'Mejora no encontrada'
            });
            return;
        }

        const puntosUsuario = usuarios[0].puntos;
        const precioMejora = parseInt(mejoras[0].precio);

        if (puntosUsuario < precioMejora) {
            await pool.query('ROLLBACK');
            res.status(400).json({
                success: false,
                error: 'Puntos insuficientes'
            });
            return;
        }


        await pool.query(
            'UPDATE Usuario SET puntos = puntos - ? WHERE idUsuario = ?',
            [precioMejora, idUsuario]
        );


        await pool.query(
            'INSERT INTO Usuario_has_Mejoras (Usuario_idUsuario, Mejoras_idMejoras) VALUES (?, ?)',
            [idUsuario, idMejora]
        );

        await pool.query('COMMIT');

        const [datosActualizados] = await pool.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        res.status(200).json({
            success: true,
            message: 'Mejora comprada exitosamente',
            puntos: datosActualizados[0].puntos
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error al comprar mejora:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.post('/', comprarMejoraHandler);

export default router;
