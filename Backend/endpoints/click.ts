import express from 'express';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { calcularMultiplicadorClick } from '../produccion';

const router = express.Router();

const clickHandler: express.RequestHandler = async (req, res) => {
    const idUsuario = (req as any).idUsuario as number;
    const pool = (req as any).db as Pool;

    try {
        const multiplicador = await calcularMultiplicadorClick(pool, idUsuario);

        const [resultado] = await pool.query<ResultSetHeader>(
            'UPDATE Usuario SET puntos = puntos + ? WHERE idUsuario = ?',
            [multiplicador, idUsuario]
        );

        if (resultado.affectedRows === 0) {
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Click registrado exitosamente',
            multiplicador
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
