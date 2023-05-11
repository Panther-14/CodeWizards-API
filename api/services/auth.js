const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Endpoint para generar un token
router.post('/login', (req, res) => {
  // Aquí deberías hacer una consulta a tu base de datos para verificar las credenciales del usuario
  /*const { username, password } = req.body;
  const user = Business.loginUser(username, password);*/
  const user = {
    id: 1,
    username: 'usuario1',
    email: 'usuario1@example.com'
  };

  // Genera un token que expira en 1 hora
  jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.status(500).json({ error: true, message: "Upss" });
      console.error(err);
      return;
    }
    res.json({ token });
  });
});

router.post('/logout', (req, res) => {
  // Aqui el logout
  res.json({ message: "Bye Bye" });
});

module.exports = router;