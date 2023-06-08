const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const BusinessUser = require('../business/users');
const EmailSender = require('../util/email_sender');
const generateRandomNumber = require('../util/otp_generator');

router.use(verifyToken);

//Actualizar Perfil
router.patch('/updateprofile', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Actualizar Contraseña
router.patch('/updatepassword', (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  BusinessUser.updatePassword(username, oldPassword, newPassword)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    if (resultados.affectedRows > 0) {
      res.status(200).json({ error: false, message: 'Actualización de contraseña exitosa', affectedRows: resultados.affectedRows });
    } else {
      res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
    }
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en la actualización' });
  });
  res.json(`${user} ${req.user}`);
});

//Recuperar Contraseña
router.post('/sendotp', (req, res) => {
  const { email, username } = req.body;
  const otp = generateRandomNumber(6);
  try{
    const resultados = BusinessUser.getUserEmail(username,email);
    if(resultados.length > 0){
      try{
        const res = BusinessUser.updateOtp(username,otp);
        if(res.affectedRows > 0){
          EmailSender.sendEmail(email, subject, body)
          .then(() => {
            res.status(200).json({ error: false, message: 'OTP Enviado Correctamente', otp: otp});
            
          })
          .catch((error) => {
            console.error('Error en el envio:', error);
            res.status(500).json({ error: true, message: 'OTP No Enviado'});
          });
        }
      }catch(err){
        console.error('Error en la actualización del otp:', err);
      }
    }else{
      res.status(200).json({ error: false, message: 'Nada que mostrar', correo: resultados});
    }
  }catch(err){
    console.error('Error en la busqueda del email:', err);
  }
});
//Recuperar Contraseña
router.post('/recoverpassword', (req, res) => {
  const { email, username, oldPassword, newPassword } = req.body;

  BusinessUser.recoverPassword(username,newPassword,oldPassword)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    if (resultados.affectedRows > 0) {
      res.status(200).json({ error: false, message: 'Actualización de contraseña exitosa', affectedRows: resultados.affectedRows });
    } else {
      res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
    }
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en la actualización' });
  });
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
        res.status(200).json({ error: false, message: 'Consulta exitosa', usuarios: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', usuarios: resultados });
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
        res.status(200).json({ error: false, message: 'Consulta exitosa', usuario: resultados[0] });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', usuario: resultados[0] });
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
        res.status(500).json({ error: true, message: 'Broadcast No Enviado'});
      });
    }
  })
  .catch((error) => {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: true, message: 'Error en la consulta' });
  });
});

module.exports = router;