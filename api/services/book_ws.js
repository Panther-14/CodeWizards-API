const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');

router.use(verifyToken);

//Obtener todos los libros
router.get('/', (req, res) => {
  res.json({ libros: 'Overlord' });
});

//Subir Libro
router.put('/addbook', (req, res) => {
  res.json({ volumenes: 100 });
});

//Actualizar Libro
router.patch('/updatebook', (req, res) => {
  res.json({ volumenes: 100 });
});

//Eliminar Libro
router.post('/deletebook', (req, res) => {
  res.json({ libros: 'Overlord' });
});

//Calificar Libro
router.post('/reviewbook', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Buscar Libro
router.get('/findbook/:bookname', (req, res) => {
  const bookname = req.params.bookname;
  res.json({ test: "Hola!!", book: bookname });
});

//Consultar Libro
router.get('/book/:bookname', (req, res) => {
  const bookname = req.params.bookname;
  res.json({ test: "Hola!!", book: bookname });
});

module.exports = router;