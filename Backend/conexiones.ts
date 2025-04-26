import express from 'express';
import mysql from 'mysql2/promise';
import { dbConfig } from './config/database';
import crearCuenta from './endpoints/crearCuenta';
import iniciarSesion from './endpoints/iniciarSesion';
import click from './endpoints/click';
import listaEdificios from './endpoints/listaEdificios';

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
router.use('/click', click);
router.use('/edificios', listaEdificios);

export default router;