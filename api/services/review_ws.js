const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');

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
  res.json({ test: "Hola!!" });
});

//Reportar Reseña
router.post('/reportreview', (req, res) => {
  res.json({ test: "Hola!!" });
});

module.exports = router;