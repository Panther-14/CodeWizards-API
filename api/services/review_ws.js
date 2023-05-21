const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const BusinessReview = require('../business/reviews');

router.use(verifyToken);

//Visualizar Reseñas
router.get('/all', (req, res) => {
  res.json({ test: "Hola!!", idbook: idbook });
});

//Visualizar Reseñas reportadas
router.get('/reported', (req, res) => {
  res.json({ test: "Hola!!", idbook: idbook });
});

//Visualizar Reseñas por libro
router.get('/book/:idbook', (req, res) => {
  const idbook = req.params.idbook;
  res.json({ test: "Hola!!", idbook: idbook });
});

//Escribir Reseña
router.put('/leavereview', (req, res) => {
  res.json({ libros: 'Overlord' });
});

//Delete Review
router.delete('/deletereview', (req, res) => {
  const { idResenia } = req.body;

  BusinessReview.deleteReview(idResenia)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Actualización de Usuario exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en el registro' });
    });
});

//Reportar Reseña
router.post('/reportreview', (req, res) => {
  res.json({ test: "Hola!!" });
});

module.exports = router;