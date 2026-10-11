import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const BCRYPT_ROUNDS = 10;
const DURACION_TOKEN = '12h';

const JWT_SECRET = process.env.JWT_SECRET || (() => {
    console.warn('JWT_SECRET no definido: se usa un secreto aleatorio y las sesiones se perderán al reiniciar el servidor');
    return crypto.randomBytes(32).toString('hex');
})();

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
};

// Formato antiguo (SHA-256 con sal fija). Solo se usa para migrar a bcrypt las cuentas ya existentes
const hashLegacy = (password: string): string => {
    return crypto
        .createHash('sha256')
        .update(password + 'puppysalt')
        .digest('hex');
};

export const esHashLegacy = (hash: string): boolean => !hash.startsWith('$2');

export const verificarPassword = async (password: string, hash: string): Promise<boolean> => {
    if (!esHashLegacy(hash)) {
        return bcrypt.compare(password, hash);
    }

    const calculado = Buffer.from(hashLegacy(password));
    const guardado = Buffer.from(hash);
    return calculado.length === guardado.length && crypto.timingSafeEqual(calculado, guardado);
};

export const generarToken = (idUsuario: number): string => {
    return jwt.sign({ idUsuario }, JWT_SECRET, { expiresIn: DURACION_TOKEN });
};

// Middleware: exige "Authorization: Bearer <token>" y deja el id del usuario autenticado en req.idUsuario
export const requireAuth: express.RequestHandler = (req, res, next) => {
    const cabecera = req.headers.authorization;
    const token = cabecera?.startsWith('Bearer ') ? cabecera.slice(7) : null;

    if (!token) {
        res.status(401).json({
            success: false,
            error: 'No autenticado'
        });
        return;
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as jwt.JwtPayload;
        (req as any).idUsuario = payload.idUsuario;
        next();
    } catch {
        res.status(401).json({
            success: false,
            error: 'Sesión no válida o caducada'
        });
    }
};
