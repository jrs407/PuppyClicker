import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';

const router = express.Router();

const listaEdificiosHandler: express.RequestHandler = async (req, res) => {
    const { idUsuario } = req.params;
    const pool = (req as any).db as Pool;

    try {
        console.log(`Fetching buildings for user ${idUsuario}`);
        
        // Primero verificar si el usuario existe
        const [userExists] = await pool.query<RowDataPacket[]>(
            'SELECT idUsuario FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        if (userExists.length === 0) {
            console.log(`User ${idUsuario} not found`);
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        const [edificios] = await pool.query<RowDataPacket[]>(
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
            [idUsuario]
        );

        console.log(`Found ${edificios.length} buildings for user ${idUsuario}`);

        // Siempre devolver un array vacío si no hay edificios, en lugar de un error
        res.status(200).json({
            success: true,
            edificios: edificios
        });

    } catch (error) {
        console.error('Error al obtener lista de edificios:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.get('/:idUsuario', listaEdificiosHandler);

export default router;
