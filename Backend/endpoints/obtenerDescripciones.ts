import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';

const router = express.Router();

const obtenerDescripcionesHandler: express.RequestHandler = async (req, res) => {
    const pool = (req as any).db as Pool;

    try {
        const [descripciones] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM Descripciones WHERE descripcion IS NOT NULL ORDER BY RAND() LIMIT 50'
        );

        if (descripciones.length === 0) {
            res.status(200).json({
                success: true,
                descripciones: [{
                    idDescripciones: 0,
                    descripcion: '¡Bienvenido!'
                }]
            });
            return;
        }

        res.status(200).json({
            success: true,
            descripciones: descripciones
        });

    } catch (error) {
        console.error('Error al obtener descripciones:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.get('/', obtenerDescripcionesHandler);

export default router;
