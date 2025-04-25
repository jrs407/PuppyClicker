import express from 'express';
import conexiones from './conexiones';

const app = express();
const port = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS
app.use((req, res, next) => {
  console.log('Request received:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body
  });

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.sendStatus(200);
    return;
  }
  
  next();
});

// Usar el router de conexiones
app.use('/api', conexiones);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
