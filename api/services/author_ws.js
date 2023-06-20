const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const authorBusiness = require('../business/authors');

router.use(verifyToken);

//Buscar Autore por Libro
router.get('/findAutorsBook/:idLibro', (req, res) => {
  const idLibro = req.params.idLibro;

  authorBusiness.findAutorsBook(idLibro)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', autores: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', autores: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

router.get('/AllAuthors', (req, res) => {

  authorBusiness.getAllAuthors()
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', autores: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', autores: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});


module.exports = router;