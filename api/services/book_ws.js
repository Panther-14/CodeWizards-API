const { Router } = require('express');
const router = Router();

const verifyToken = require('../security/tkn_auth');
const bookBusiness = require('../business/books');

router.use(verifyToken);

//Obtener todos los libros
router.get('/all', (req, res) => {
  bookBusiness.getAllbooks()
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', librosAutores: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', librosAutores: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

//Subir Libro
router.post('/addbook', (req, res) => {
  const {
    idEditorial,
    isbn,
    fechaPublicacion,
    titulo,
    edicion,
    numeroDePaginas,
    idioma,
    idAutor } = req.body;
  bookBusiness.registerBook({
    idEditorial,
    isbn,
    fechaPublicacion,
    titulo,
    edicion,
    numeroDePaginas,
    idioma,
    idAutor
  })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Registro de Libro éxitoso exitosa', affectedRows: resultados.affectedRows });
      } else {
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
  const {
    idLibro,
    idEditorial,
    isbn,
    fechaPublicacion,
    titulo,
    edicion,
    numeroDePaginas,
    idioma,
    idAutor } = req.body;
  bookBusiness.updateBook({
    idLibro,
    idEditorial,
    isbn,
    fechaPublicacion,
    titulo,
    edicion,
    numeroDePaginas,
    idioma,
    idAutor
  })
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Actualizacion de Libro éxitoso exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Actualizar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: false, message: 'Error en el registro' });
    });
});

//Eliminar Libro
router.delete('/deletebook', (req, res) => {
  const { idLibro } = req.body;

  bookBusiness.deleteBook(idLibro)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      const affectedRows = resultados.resultados1.affectedRows + resultados.resultados2.affectedRows;

      if (affectedRows > 0) {
        res.status(200).json({ error: false, message: 'Eliminación de Libro exitosa', affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que Eliminar', affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la eliminación' });
    });
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

//Buscar Libro
router.get('/findbook/:bookname', (req, res) => {
  const bookname = req.params.bookname;

  bookBusiness.findBook(bookname)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', libros: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', libros: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

//Buscar Biblioteca
router.get('/findLibrary/:idUsuario/:idEstados', (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idEstados = req.params.idEstados;


  bookBusiness.findLibrary(idUsuario, idEstados)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', libros: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', libros: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});






//Buscar Biblioteca del Libro
router.get('/findLibraryByUser/:idUsuario/:idLibro', (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idLibro = req.params.idLibro;


  bookBusiness.findLibraryByUser(idUsuario, idLibro)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', libros: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', libros: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

//Guardar Libro en Biblioteca
router.post('/registerBookLibrary', (req, res) => {
  const { idUsuario, idLibro, idEstado } = req.body;

  bookBusiness.registerBookLibrary(idUsuario, idLibro, idEstado)
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Registro de Libro éxitoso exitosa', affectedRows: resultados.affectedRows });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', affectedRows: resultados.affectedRows });
      }
    })
    .catch((error) => {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});

//Eliminar Libro en Biblioteca
router.delete('/deleteBookLibrary/:idUsuario/:idLibro', (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idLibro = req.params.idLibro;

  bookBusiness.deleteBookLibrary(idUsuario, idLibro)
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


router.get('/allEditoriales', (req, res) => {
  bookBusiness.getAllEditoriales()
    .then((resultados) => {
      console.log('Resultados:', resultados);
      if (resultados.length > 0) {
        res.status(200).json({ error: false, message: 'Consulta exitosa', editoriales: resultados });
      } else {
        res.status(200).json({ error: false, message: 'Nada que mostrar', editoriales: resultados });
      }
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: true, message: 'Error en la consulta' });
    });
});


module.exports = router;
