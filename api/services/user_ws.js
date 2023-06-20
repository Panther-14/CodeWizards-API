const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const BusinessUser = require('../business/users');
const EmailSender = require('../util/email_sender');
const generateRandomNumber = require('../util/otp_generator');

router.use(verifyToken);

//Actualizar Perfil
router.patch('/updateprofile', (req, res) => {
  const { idUsuario, nombre, apellidoPaterno, apellidoMaterno, email, password } = req.body;
  BusinessUser.updateUser({ idUsuario, nombre, apellidoPaterno, apellidoMaterno, email, password })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Actualización de perfil exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la actualización' });
    });
  //res.json({ test: "Hola!!" });
});

//Actualizar Contraseña
router.patch('/updatepassword', (req, res) => {
  const { idUsuario, oldPassword, newPassword } = req.body;
  BusinessUser.updatePassword(idUsuario, oldPassword, newPassword)
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

//Recuperar Contraseña
router.post('/sendotp', (req, res) => {
  const { email, username } = req.body;
  const otp = generateRandomNumber(6);
  console.log("OTP:", otp);

  BusinessUser.getUserEmail(username, email)
    .then((resultados) => {
      if (resultados.length > 0) {
        BusinessUser.updateOtp(username, otp)
          .then((resultado) => {
            if (resultado.affectedRows > 0) {
              var result = EmailSender.sendEmail({ toEmail: email, subject: "One Time Password", body: `${otp}` });
              if (result) {
                res.status(200).json({ error: false, message: 'OTP Enviado Correctamente', otp: otp });
              } else {
                res.status(500).json({ error: false, message: 'OTP No Enviado' });
              }
            } else {
              res.status(500).json({ error: true, message: 'OTP No Enviado' });
            }
          })
          .catch((err) => {
            console.error('Error en la actualización del otp:', err);
          });

      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', correo: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la busqueda del email:', error);
    });
});
//Recuperar Contraseña
router.post('/recoverpassword', (req, res) => {
  const { email, username, oldPassword, newPassword } = req.body;

  BusinessUser.recoverPassword(username, newPassword, oldPassword)
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
router.delete('/deleteprofile', (req, res) => {
  const { idUsuario } = req.body;
  BusinessUser.deleteUser(idUsuario)
    .then((resultados) => {
      console.log(resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Eliminación de Usuario exitoso', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error("Error al eliminar:", error);
    });
});

//Buscar Perfil
router.get('/finduser/:username', (req, res) => {
  const username = req.params.username;

  BusinessUser.findUser(username)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa ULISES', usuarios: resultados });
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

//Broadcast
router.post('/broadcast', (req, res) => {
  const { subject, content } = req.body;
  BusinessUser.getAllUsersEmail()
    .then((resultados) => {
      console.log("Resultados:", resultados);
      if (resultados.length > 0) {
        const emails = [];
        for (let i = 0; i < resultados.length; i++) {
          emails.push(resultados[i].email);
        }
        console.log("Emails", emails);
        var result = EmailSender.sendBroadcastEmail({ toEmails: emails, subject: subject, content: content })
        if (result) {
          res.status(200).json({ error: false, message: 'Broadcast Enviado Correctamente' });
        } else {
          res.status(500).json({ error: false, message: 'Broadcast No Enviado' });
        }

      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

router.get('/allUsers', (req, res) => {
  BusinessUser.getAllUsers()
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', usuarios: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', usuarios: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

module.exports = router;