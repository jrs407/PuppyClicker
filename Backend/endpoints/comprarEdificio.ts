import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';

const router = express.Router();

const comprarEdificioHandler: express.RequestHandler = async (req, res) => {
    const { idUsuario, idEdificio } = req.body;
    const pool = (req as any).db as Pool;

    try {
        // Inicio de la transacción
        await pool.query('START TRANSACTION');

        // Obtener información del usuario y del edificio
        const [usuarios] = await pool.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        const [edificios] = await pool.query<RowDataPacket[]>(
            'SELECT precioInicial FROM Edificios WHERE idEdificios = ?',
            [idEdificio]
        );

        const [edificiosUsuario] = await pool.query<RowDataPacket[]>(
            'SELECT numeroComprado FROM Edificios_has_Usuario WHERE Usuario_idUsuario = ? AND Edificios_idEdificios = ?',
            [idUsuario, idEdificio]
        );

        if (usuarios.length === 0) {
            await pool.query('ROLLBACK');
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        if (edificios.length === 0) {
            await pool.query('ROLLBACK');
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        const puntosUsuario = usuarios[0].puntos;
        const precioEdificio = edificios[0].precioInicial;
        const numeroComprado = parseInt(edificiosUsuario[0].numeroComprado || '0');
        const precioFinal = Math.floor(precioEdificio * Math.pow(1.15, numeroComprado));

        if (puntosUsuario < precioFinal) {
            await pool.query('ROLLBACK');
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        // Actualizar puntos del usuario
        await pool.query(
            'UPDATE Usuario SET puntos = puntos - ? WHERE idUsuario = ?',
            [precioFinal, idUsuario]
        );

        // Actualizar número de edificios
        await pool.query(
            'UPDATE Edificios_has_Usuario SET numeroComprado = numeroComprado + 1 WHERE Usuario_idUsuario = ? AND Edificios_idEdificios = ?',
            [idUsuario, idEdificio]
        );

        // Confirmar la transacción
        await pool.query('COMMIT');

        // Obtener datos actualizados
        const [datosActualizados] = await pool.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        const [edificiosActualizados] = await pool.query<RowDataPacket[]>(
            'SELECT numeroComprado FROM Edificios_has_Usuario WHERE Usuario_idUsuario = ? AND Edificios_idEdificios = ?',
            [idUsuario, idEdificio]
        );

        res.status(200).json({
            success: true,
            message: 'Edificio comprado exitosamente',
            puntos: datosActualizados[0].puntos,
            numeroComprado: edificiosActualizados[0].numeroComprado
        });

    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error al comprar edificio:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
};

router.post('/', comprarEdificioHandler);

export default router;
