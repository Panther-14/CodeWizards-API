const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const bookBusiness = require('../business/books');

router.use(verifyToken);

//Obtener todos los libros
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

//Sugerir Libro
router.post('/suggest', (req, res) => {
  res.json({ test: "Hola!!" });
});

module.exports = router;