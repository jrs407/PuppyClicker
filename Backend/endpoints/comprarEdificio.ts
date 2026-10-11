import express from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { liquidarProduccion } from '../produccion';

const router = express.Router();

const comprarEdificioHandler: express.RequestHandler = async (req, res) => {
    const idUsuario = (req as any).idUsuario as number;
    const { idEdificio } = req.body;
    const pool = (req as any).db as Pool;
    const conn = await pool.getConnection();

    try {
        // Inicio de la transacción
        await conn.beginTransaction();

        // Se cobra la producción pendiente con los edificios actuales antes de cambiar su número.
        // Además bloquea la fila del usuario, así dos compras simultáneas no pueden gastar los mismos puntos
        if (!(await liquidarProduccion(conn, idUsuario))) {
            await conn.rollback();
            res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
            return;
        }

        // Obtener información del usuario y del edificio
        const [usuarios] = await conn.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        const [edificios] = await conn.query<RowDataPacket[]>(
            `SELECT e.precioInicial, eu.numeroComprado
             FROM Edificios e
             JOIN Edificios_has_Usuario eu ON e.idEdificios = eu.Edificios_idEdificios
             WHERE eu.Usuario_idUsuario = ? AND e.idEdificios = ?`,
            [idUsuario, idEdificio]
        );

        if (edificios.length === 0) {
            await conn.rollback();
            res.status(404).json({
                success: false,
                error: 'Edificio no encontrado'
            });
            return;
        }

        const puntosUsuario = usuarios[0].puntos;
        const precioEdificio = edificios[0].precioInicial;
        const numeroComprado = parseInt(edificios[0].numeroComprado || '0');
        const precioFinal = Math.floor(precioEdificio * Math.pow(1.15, numeroComprado));

        if (puntosUsuario < precioFinal) {
            await conn.rollback();
            res.status(400).json({
                success: false,
                error: 'Puntos insuficientes'
            });
            return;
        }

        // Actualizar puntos del usuario
        await conn.query(
            'UPDATE Usuario SET puntos = puntos - ? WHERE idUsuario = ?',
            [precioFinal, idUsuario]
        );

        // Actualizar número de edificios
        await conn.query(
            'UPDATE Edificios_has_Usuario SET numeroComprado = numeroComprado + 1 WHERE Usuario_idUsuario = ? AND Edificios_idEdificios = ?',
            [idUsuario, idEdificio]
        );

        // Obtener datos actualizados
        const [datosActualizados] = await conn.query<RowDataPacket[]>(
            'SELECT puntos FROM Usuario WHERE idUsuario = ?',
            [idUsuario]
        );

        const [edificiosActualizados] = await conn.query<RowDataPacket[]>(
            'SELECT numeroComprado FROM Edificios_has_Usuario WHERE Usuario_idUsuario = ? AND Edificios_idEdificios = ?',
            [idUsuario, idEdificio]
        );

        // Confirmar la transacción
        await conn.commit();

        res.status(200).json({
            success: true,
            message: 'Edificio comprado exitosamente',
            puntos: datosActualizados[0].puntos,
            numeroComprado: edificiosActualizados[0].numeroComprado
        });

    } catch (error) {
        await conn.rollback();
        console.error('Error al comprar edificio:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    } finally {
        conn.release();
    }
};

router.post('/', comprarEdificioHandler);

export default router;
