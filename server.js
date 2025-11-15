// =======================================
// Microservicio de Análisis de Encabezados
// Proyecto #2 - freeCodeCamp
// =======================================

const express = require('express');
const path = require('path');

const app = express();

// Servir carpeta public (index.html y estáticos)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta requerida por freeCodeCamp
app.get('/api/whoami', (req, res) => {

  // ==============================
  // 1. OBTENER DIRECCIÓN IP
  // ==============================
  let ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    '';

  // Limpieza de IPv6 estilo "::ffff:127.0.0.1"
  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  // Caso "::1" (localhost)
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  // ==============================
  // 2. OBTENER IDIOMA (HEADER COMPLETO)
  // ==============================
  const languageHeader = req.headers['accept-language'] || '';

  // ==============================
  // 3. OBTENER SOFTWARE (USER-AGENT)
  // ==============================
  const software = req.headers['user-agent'] || '';

  // ==============================
  // RESPUESTA JSON EXACTA PEDIDA
  // ==============================
  res.json({
    ipaddress: ip,
    language: languageHeader,
    software: software
  });
});

// Puerto asignado por Render o 3000 en local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en el puerto ${PORT}`);
});
