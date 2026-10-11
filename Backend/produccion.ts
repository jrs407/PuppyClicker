import { Pool, PoolConnection, RowDataPacket } from 'mysql2/promise';

// Máximo de segundos de producción que se acumulan entre dos liquidaciones.
// Evita que una sesión abandonada durante horas genere producción de golpe.
const MAX_SEGUNDOS_PRODUCCION = 60;

type Conexion = Pool | PoolConnection;

// Número de mejoras compradas por el usuario, agrupadas por tipo ('click', 'pug', ...)
const contarMejorasPorTipo = async (db: Conexion, idUsuario: number): Promise<Record<string, number>> => {
    const [filas] = await db.query<RowDataPacket[]>(
        `SELECT LOWER(tm.nombre) AS tipo, COUNT(*) AS cantidad
         FROM Usuario_has_Mejoras uhm
         JOIN Mejoras m ON m.idMejoras = uhm.Mejoras_idMejoras
         JOIN TipoMejora tm ON tm.idTipoMejora = m.TipoMejora_idTipoMejora
         WHERE uhm.Usuario_idUsuario = ?
         GROUP BY LOWER(tm.nombre)`,
        [idUsuario]
    );

    const mejoras: Record<string, number> = {};
    for (const fila of filas) {
        mejoras[fila.tipo] = Number(fila.cantidad);
    }
    return mejoras;
};

// Cada mejora de click duplica los puntos por click
export const calcularMultiplicadorClick = async (db: Conexion, idUsuario: number): Promise<number> => {
    const mejoras = await contarMejorasPorTipo(db, idUsuario);
    return Math.pow(2, mejoras['click'] || 0);
};

// Cada mejora de una raza duplica la producción de los edificios de esa raza
export const calcularProduccionPorSegundo = async (db: Conexion, idUsuario: number): Promise<number> => {
    const mejoras = await contarMejorasPorTipo(db, idUsuario);

    const [edificios] = await db.query<RowDataPacket[]>(
        `SELECT
            e.raza,
            e.produccionInicial,
            CAST(eu.numeroComprado AS SIGNED) AS numeroComprado
        FROM Edificios e
        JOIN Edificios_has_Usuario eu ON e.idEdificios = eu.Edificios_idEdificios
        WHERE eu.Usuario_idUsuario = ?`,
        [idUsuario]
    );

    return edificios.reduce((total, edificio) => {
        const multiplicador = Math.pow(2, mejoras[edificio.raza.toLowerCase()] || 0);
        return total + edificio.produccionInicial * Number(edificio.numeroComprado) * multiplicador;
    }, 0);
};

// Suma al usuario la producción de sus edificios desde la última liquidación.
// Debe llamarse dentro de una transacción: bloquea la fila del usuario hasta el COMMIT/ROLLBACK.
// Devuelve false si el usuario no existe.
export const liquidarProduccion = async (conn: PoolConnection, idUsuario: number): Promise<boolean> => {
    const [usuarios] = await conn.query<RowDataPacket[]>(
        'SELECT TIMESTAMPDIFF(SECOND, ultimaActualizacion, NOW(3)) AS segundos FROM Usuario WHERE idUsuario = ? FOR UPDATE',
        [idUsuario]
    );

    if (usuarios.length === 0) {
        return false;
    }

    const segundos = Math.max(0, Number(usuarios[0].segundos));
    const produccion = await calcularProduccionPorSegundo(conn, idUsuario);

    if (produccion === 0 || segundos > MAX_SEGUNDOS_PRODUCCION) {
        await conn.query(
            'UPDATE Usuario SET puntos = puntos + ?, ultimaActualizacion = NOW(3) WHERE idUsuario = ?',
            [produccion * Math.min(segundos, MAX_SEGUNDOS_PRODUCCION), idUsuario]
        );
    } else {
        // Solo se avanzan los segundos completos ya pagados; la fracción restante se cobra en la siguiente liquidación
        await conn.query(
            'UPDATE Usuario SET puntos = puntos + ?, ultimaActualizacion = ultimaActualizacion + INTERVAL ? SECOND WHERE idUsuario = ?',
            [produccion * segundos, segundos, idUsuario]
        );
    }

    return true;
};
