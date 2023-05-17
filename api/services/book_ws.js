const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const bookBusiness = require('../business/books');

router.use(verifyToken);

router.get('/', (req, res) => {
  res.json({ libros: 'Overlord' });
});

//Subir Libro
router.post('/addbook', (req, res) => {
      const { 
        Editoriales_idEditoriales,
        isbn,
        fechaPublicacion,
        titulo,
        edicion,
        numeroDePaginas,
        idioma } = req.body;
    bookBusiness.registerBook({ 
      Editoriales_idEditoriales,
        isbn,
        fechaPublicacion,
        titulo,
        edicion,
        numeroDePaginas,
        idioma })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if(resultados.affectedRows > 0){
        res.status(200).json({ error: false, message: 'Registro de Libro éxitoso exitosa', affectedRows: resultados.affectedRows });
      }else{
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: false, message: 'Error en el registro' });
    });
});                   

//Actualizar Libro
router.patch('/updatebook', (req, res) => {
  res.json({ volumenes: 100 });
});

//Eliminar Libro
router.post('/deletebook', (req, res) => {
  res.json({ libros: 'Overlord' });
});

//Escribir Reseña
router.put('/leavereview', (req, res) => {
  res.json({ libros: 'Overlord' });
});

//Delete Review
router.post('/deletereview', (req, res) => {
  res.json({ test: "Hola!!" });
});

//Reportar Reseña
router.post('/reportreview', (req, res) => {
  res.json({ test: "Hola!!" });
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

//Visualizar Reseña
router.get('/reviews/:idbook', (req, res) => {
  const idbook = req.params.idbook;
  res.json({ test: "Hola!!", idbook: idbook });
});

module.exports = router;