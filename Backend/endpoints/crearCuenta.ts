import express from 'express';
import { Pool } from 'mysql2/promise';

const router = express.Router();


router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

export default router;