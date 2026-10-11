import express from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from './config/database';
import crearCuenta from './endpoints/crearCuenta';
import iniciarSesion from './endpoints/iniciarSesion';
import click from './endpoints/click';
import listaEdificios from './endpoints/listaEdificios';
import obtenerDescripciones from './endpoints/obtenerDescripciones';
import comprarEdificio from './endpoints/comprarEdificio';
import actualizarPuntos from './endpoints/actualizarPuntos';
import obtenerMejoras from './endpoints/obtenerMejoras';
import comprarMejora from './endpoints/comprarMejora';
import obtenerMejorasCompradas from './endpoints/obtenerMejorasCompradas';
import { requireAuth } from './auth';

const router = express.Router();


const pool = mysql.createPool(dbConfig);

router.use((req: any, res: any, next: any) => {
  req.db = pool;
  next();
});

router.get('/test', async (req: any, res) => {
  try {
    const [rows] = await req.db.query('SELECT 1 as test');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error de base de datos' });
  }
});

router.use('/cuenta', crearCuenta);
router.use('/iniciar-sesion', iniciarSesion);
router.use('/click', requireAuth, click);
router.use('/edificios', requireAuth, listaEdificios);
router.use('/comprar-edificio', requireAuth, comprarEdificio);
router.use('/actualizar-puntos', requireAuth, actualizarPuntos);
router.use('/mejoras', requireAuth, obtenerMejoras);
router.use('/comprar-mejora', requireAuth, comprarMejora);
router.use('/mejoras-compradas', requireAuth, obtenerMejorasCompradas);
router.use('/descripciones', obtenerDescripciones);

export default router;