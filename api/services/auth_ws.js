const { Router } = require('express');
const router = Router();

const basicAuth = require('../security/bsc_auth');
const jwt = require('jsonwebtoken');
const UsuarioBusiness = require("../business/users");

const SECRET_KEY = process.env.SECRET_KEY;

router.use(basicAuth);

router.post('/login', (req, res) => {
  // Obtiene el nombre de usuario y la contraseña del cuerpo de la solicitud
  const { username, password } = req.body;

  UsuarioBusiness.loginUser(username, password)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if (resultados.length > 0) {
        jwt.sign({ user: { username } }, SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: true, message: "Error en el token" });
            return;
          }
          res.status(200).json({ error: false, token: token, user: resultados[0] });
        });
      } else {
        res.status(401).json({ error: true, message: "Credenciales inválidas" });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: 'Error al iniciar sesión' });
    });
});

//Registrar
router.put('/signin', (req, res) => {
  const { username, nombre, apellidoPaterno, apellidoMaterno, email, password, tipoUsuario } = req.body;

  const usuario = { username, nombre, apellidoPaterno, apellidoMaterno, email, password, tipoUsuario };

  UsuarioBusiness.registerUser(usuario)
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Registro de Usuario exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      res.status(500).json({ error: true, message: "Error en el registro" });
    });
});

module.exports = router;