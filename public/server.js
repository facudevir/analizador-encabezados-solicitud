// ===============================
// Analizador de Encabezados de Solicitud
// Proyecto #2 - freeCodeCamp
// ===============================

const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos (por ejemplo, index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (muestra la página de inicio)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de la API solicitada por freeCodeCamp
app.get('/api/whoami', (req, res) => {
  // 1️⃣ Obtener la dirección IP
  const xForwardedFor = req.headers['x-forwarded-for'];
  let ip = xForwardedFor ? xForwardedFor.split(',')[0] : req.socket.remoteAddress;

  // Limpiar formato IPv6 (::ffff:127.0.0.1 → 127.0.0.1)
  if (ip && ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  // 2️⃣ Obtener el idioma preferido del encabezado "Accept-Language"
  const language = req.headers['accept-language'];

  // 3️⃣ Obtener información del software (navegador y sistema operativo)
  const software = req.headers['user-agent'];

  // 4️⃣ Enviar respuesta en formato JSON con las claves que pide freeCodeCamp
  res.json({
    ipaddress: ip || '',
    language: language ? language.split(',')[0] : '',
    software: software || ''
  });
});

// Puerto: Render asigna automáticamente uno en process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en el puerto ${PORT}`);
});
