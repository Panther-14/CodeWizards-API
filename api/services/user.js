const { Router } = require('express');
const router = Router();

const Business = require('../business/users');

// Endpoint protegido por autenticación por token
router.get('/findByUsername', (req, res) => {
  const { username, password } = req.body;
  const user = Business.loginUser(username, password);
  // Retorna los datos del usuario que fueron decodificados del token
  res.json(`${user} ${req.user}`);
});

router.patch('/updatePassword', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = Business.updatePassword(username, oldPassword, newPassword);
  // Retorna los datos del usuario que fueron decodificados del token
  res.json(`${user} ${req.user}`);
});

router.patch('/updatePassword', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = Business.updatePassword(username, oldPassword, newPassword);
  // Retorna los datos del usuario que fueron decodificados del token
  res.json(`${user} ${req.user}`);
});

module.exports = router;