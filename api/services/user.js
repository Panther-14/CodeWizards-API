const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const Business = require('../business/users');

router.use(verifyToken);

//Actualizar Perfil
router.patch('/updateprofile', (req, res) => {
  res.json({test: "Hola!!"});
});

//Actualizar Contraseña
router.patch('/updatepassword', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = Business.updatePassword(username, oldPassword, newPassword);
  res.json(`${user} ${req.user}`);
});

//Recuperar Contraseña
router.get('/recoverpassword', (req, res) => {
  res.json({test: "Hola!!"});
});

//Eliminar Perfil
router.post('/deleteprofile', (req, res) => {
  res.json({test: "Hola!!"});
});

//Buscar Perfil
router.get('/finduser/:username', (req, res) => {
  const username = req.params.username;
  res.json({test: "Hola!!"});
});

//Consultar Perfil
router.get('/profile/:username', (req, res) => {
  const username = req.params.username;
  res.json({test: "Hola!!"});
});

//Consultar Biblioteca
router.get('/library/:iduser', (req, res) => {
  const iduser = req.params.iduser;
  res.json({test: "Hola!!"});
});

//Sugerir Libro
router.post('/suggest', (req, res) => {
  res.json({test: "Hola!!"});
});

//Broadcast
router.post('/broadcast', (req, res) => {
  res.json({test: "Hola!!"});
});

module.exports = router;