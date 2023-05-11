const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware para analizar las solicitudes con cuerpo JSON
app.use(bodyParser.json());
app.set('json spaces', 2);
//CORS
/*const corsOptions = {
  origin: ['*']
};
app.use(cors(corsOptions));*/

//Rutas WEB - Sin Auth
app.use(express.static('page/src'));
app.use(require('./page/page.js'));
app.use('/auth', require('./api/services/auth.js'));

// Middleware para verificar el token en todas las solicitudes posteriores
function verifyToken(req, res, next) {
  // Obtiene el token del encabezado de la solicitud
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  // Verifica el token y lo decodifica
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      console.error(err);
      return;
    }
    // Añade el objeto decodificado a la solicitud para su uso posterior
    req.user = decoded.user;
    next();
  });
}

// Middleware para todas las solicitudes
app.use(verifyToken);

//Rutas API - Con Auth
app.use('/api/users', require('./api/services/user.js'));
app.use('/api/books', require('./api/services/book.js'));

//Endpoint WildCard
app.all('*', (req, res) => {
  res.status(404).json({ error: true, message: "NO EXISTE PRRO" });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
