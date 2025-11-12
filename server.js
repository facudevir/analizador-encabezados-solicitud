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
  const ip = req.ip; // ✅ Express maneja correctamente IPv4 e IPv6
  const language = req.headers['accept-language']; // ✅ cadena completa
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

