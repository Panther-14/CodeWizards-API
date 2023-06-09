const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const BusinessReview = require('../business/reviews');

router.use(verifyToken);

//Visualizar Reseñas reportadas
router.get('/reported', (req, res) => {
  BusinessReview.getReportedReviews()
  .then((resultados) => {
    console.log('Resultados:', resultados);
    if (resultados.length > 0) {
      res.status(200).json({ error: false, message: 'Consulta exitosa', resenias: resultados });
    } else {
      res.status(200).json({ error: false, message: 'Nada que mostrar', resenias: resultados });
    }
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
});

//Visualizar Reseñas por libro
router.get('/book/:idbook', (req, res) => {
  const idLibro = req.params.idbook;
  BusinessReview.getBookReviews(idLibro)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    if (resultados.length > 0) {
      res.status(200).json({ error: false, message: 'Consulta exitosa', resenias: resultados });
    } else {
      res.status(200).json({ error: false, message: 'Nada que mostrar', resenias: resultados });
    }
  })
  .catch((error) => {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: true, message: 'Error en la consulta' });
  });
});

//Escribir Reseña y Calificar libro
router.put('/leavereview', (req, res) => {
  const { idUsuario, descripcion, valoracion, idLibro } = req.body;
  BusinessReview.leaveReview(idUsuario, idLibro, descripcion,valoracion)
  .then((resultados) => {
    console.log("Resultados:", resultados);
    if(resultados.affectedRows> 0){
      res.status(200).json({ error: false, message: 'Registro de Reseña exitoso', affectedRows: resultados.affectedRows });
    }else{
      res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
    }
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
});

//Delete Review
router.delete('/deletereview', (req, res) => {
  const { idResenia } = req.body;

  BusinessReview.deleteReview(idResenia)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Eliminación de Reseña exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Eliminar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la eliminación' });
    });
});

//Reportar Reseña
router.post('/reportreview', (req, res) => {
  const {idUsuario, idResenia } = req.body;
  BusinessReview.reportReview(idUsuario, idResenia)
  .then((resultados) => {
    console.log('Resultados:', resultados);
    if (resultados.affectedRows > 0) {
      res.status(200).json({ error: false, message: 'Reporte de reseña exitoso', affectedRows: resultados.affectedRows });
    } else {
      res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
    }
  })
  .catch((error) => {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: true, message: 'Error en el registro' });
  });
});

module.exports = router;