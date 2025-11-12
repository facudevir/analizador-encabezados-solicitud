// ===============================
// Analizador de Encabezados de Solicitud
// Proyecto #2 - freeCodeCamp
// ===============================

const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de la API solicitada por freeCodeCamp
app.get('/api/whoami', (req, res) => {
  // Detectar dirección IP válida
  const ip = req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].split(',')[0]
    : req.ip;

  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];

  res.json({
    ipaddress: ip || '',
    language: language || '',
    software: software || ''
  });
});
// Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en el puerto ${PORT}`);
});

