import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 8080;

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'puppypassword',
  database: process.env.DB_NAME || 'mydb',
  port: 3306  // El puerto interno sigue siendo 3306
};

// Pool de conexiones MySQL
const pool = mysql.createPool(dbConfig);

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS (básico)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Ruta de prueba de base de datos
app.get('/api/test-db', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT 1 as test');
    connection.release();
    res.json({ message: 'Conexión a base de datos exitosa', data: rows });
  } catch (error) {
    res.status(500).json({ message: 'Error conectando a la base de datos', error });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
