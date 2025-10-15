
const express = require('express');
const app = express();
const port = 3000; // Puerto estándar para un servidor de desarrollo

// Middleware para parsear JSON (lo necesitaremos más adelante)
app.use(express.json());

// Una ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡El servidor está funcionando!');
});

// Endpoint para la identificación de insectos (aún no implementado)
app.post('/api/identify', (req, res) => {
  console.log('Se ha recibido una petición en /api/identify');
  // Lógica futura para llamar a la API de OpenAI irá aquí
  res.status(200).json({ message: 'Petición recibida. Funcionalidad en desarrollo.' });
});

// El servidor se pone en marcha y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
