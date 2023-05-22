const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const BusinessUser = require('../business/users');
const EmailSender = require('../util/email_sender');

router.use(verifyToken);

//Actualizar Perfil
router.patch('/updateprofile', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Actualizar Contraseña
router.patch('/updatepassword', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = BusinessUser.updatePassword(username, oldPassword, newPassword);
  res.json(`${user} ${req.user}`);
});

//Recuperar Contraseña
router.get('/recoverpassword', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Eliminar Perfil
router.post('/deleteprofile', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Buscar Perfil
router.get('/finduser/:username', (req, res) => {
  const username = req.params.username;

  BusinessUser.findUser(username)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', resultados: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', resultados: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

//Consultar Perfil
router.get('/profile/:username', (req, res) => {
  const username = req.params.username;

  BusinessUser.seeProfile(username)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', resultados: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', resultados: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

//Consultar Biblioteca
router.get('/library/:iduser', (req, res) => {
  const iduser = req.params.iduser;
  res.json({ test: "Hola!!" });
});

//Sugerir Libro
router.post('/suggest', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Broadcast
router.post('/broadcast', (req, res) => {
  BusinessUser.getAllUsersEmail()
  .then((resultados) => {
    console.log("Resultados:", resultados);
    if(resultados.length > 0){
      EmailSender.sendBroadcastEmail(resultados, subject, body)
      .then(() => {
        res.status(200).json({ error: false, message: 'Broadcast Enviado Correctamente'});
      })
      .catch((error) => {
        console.error('Error en el envio:', error);
        res.status(200).json({ error: false, message: 'Broadcast No Enviado'});
      });
    }
  })
  .catch((error) => {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: true, message: 'Error en la consulta' });
  });
});

module.exports = router;