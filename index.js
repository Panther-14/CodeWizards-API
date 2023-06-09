const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './.env' })

// Settings
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ['CodeWizards'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
};

// Middleware para analizar las solicitudes con cuerpo JSON
app.use(bodyParser.json());
app.set('json spaces', 2);

// CORS
app.use(cors(corsOptions));

//Rutas WEB
app.use(express.static('./page/src'));
app.use(require('./page/page.js'));

//Rutas Auth - Basic Auth
app.use('/auth', require('./api/services/auth_ws.js'));

//Rutas API - Token Auth
app.use('/api/users', require('./api/services/user_ws.js'));
app.use('/api/books', require('./api/services/book_ws.js'));
app.use('/api/reviews', require('./api/services/review_ws.js'));
app.use('/api/authors', require('./api/services/author_ws.js'));

// Endpoint WildCard
app.all('*', (req, res) => {
  res.status(404).json({ error: true, message: "NO EXISTE EL RECURSO SOLICITADO" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});