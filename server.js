// ===============================
// Analizador de Encabezados de Solicitud
// Proyecto #2 - freeCodeCamp
// ===============================

const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta API requerida por freeCodeCamp
app.get('/api/whoami', (req, res) => {
  // Obtener dirección IP (compatible con proxies y Render)
  let ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    '';

  // Limpiar formato IPv6 (ejemplo ::ffff:127.0.0.1)
  if (ip.startsWith('::ffff:')) ip = ip.substring(7);
  if (ip === '::1') ip = '127.0.0.1';

  // Idioma preferido
  const language = req.headers['accept-language'] || 'desconocido';

  // Información del software (navegador y SO)
  const software = req.headers['user-agent'] || 'no detectado';

  // Respuesta JSON con las claves pedidas
  res.json({
    ipaddress: ip,
    language: language.split(',')[0],
    software
  });
});

// Puerto asignado por Render o local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en el puerto ${PORT}`);
});


