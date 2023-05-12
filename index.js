const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config()

// Settings
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ['https://www.example1.com', 'https://www.example2.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware para analizar las solicitudes con cuerpo JSON
app.use(bodyParser.json());
app.set('json spaces', 2);

// CORS
app.use(cors());

//Rutas WEB
app.use(express.static('./page/src'));
app.use(require('./page/page.js'));

//Rutas Auth - Basic Auth
app.use('/auth', require('./api/services/auth.js'));

//Rutas API - Token Auth
app.use('/api/users', require('./api/services/user.js'));
app.use('/api/books', require('./api/services/book.js'));

// Endpoint WildCard
app.all('*', (req, res) => {
  res.status(404).json({ error: true, message: "NO EXISTE EL RECURSO SOLICITADO" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
/*
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado en http://0.0.0.0:${PORT}`);
});
*/