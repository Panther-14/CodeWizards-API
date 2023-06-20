const BookDAO = require('../data/book_dao');

async function getBookDetails(idbook) {
  try {
    const resultados = await BookDAO.detallesLibro(idbook);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerBook({
  idEditorial,
  isbn,
  fechaPublicacion,
  titulo,
  edicion,
  numeroDePaginas,
  idioma,
  idAutor
}) {
  try {
    const bookToRegister = {
      idEditorial,
      isbn,
      fechaPublicacion,
      titulo,
      edicion,
      numeroDePaginas,
      idioma,
      idAutor
    };
    const result = await BookDAO.registerBook(bookToRegister);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function findBook(bookname) {
  try {
    const resultados = await BookDAO.obtenerLibro(bookname);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function findLibrary(idUsuario, idEstados) {
  try {
    const resultados = await BookDAO.obtenerLibroPorBiblioteca(idUsuario, idEstados);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}







async function findLibraryByUser(idUsuario, idLibro) {
  try {
    const resultados = await BookDAO.obtenerBibliotecaPorLibro(idUsuario, idLibro);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerBookLibrary(idUsuario, idLibro, idEstado) {
  try {
    const resultados = await BookDAO.guardarLibroBiblioteca(idUsuario, idLibro, idEstado);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteBookLibrary(idUsuario, idLibro) {
  try {
    const resultados = await BookDAO.eliminarLibroBiblioteca(idUsuario, idLibro);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getAllbooks() {
  try {
    const resultados = await BookDAO.obtenerTodosLibros();
    const librosConAutores = {};

    // Procesa los resultados de la consulta
    for (let i = 0; i < resultados.length; i++) {
      const libro = resultados[i];
      const libroId = libro.idLibro;

      // Si el libro no existe en el objeto, crea una nueva entrada
      if (!librosConAutores[libroId]) {
        librosConAutores[libroId] = {
          idLibro: libro.idLibro,
          titulo: libro.titulo,
          autores: [],
          idEditorial: libro.idEditorial,
          isbn: libro.isbn,
          fechaPublicacion: libro.fechaPublicacion,
          edicion: libro.edicion,
          numeroDePaginas: libro.numeroDePaginas,
          idioma: libro.idioma,
          sipnosis: libro.sipnosis,
        };
      }

      // Agrega el autor al libro correspondiente
      const autor = {
        idAutor: libro.idAutor,
        nombre: libro.nombre,
        apellidoPaterno: libro.apellidoPaterno,
        apellidoMaterno: libro.apellidoMaterno,
      };
      librosConAutores[libroId].autores.push(autor);
    }

    return librosConAutores;
  } catch (error) {
    console.error(error);
    return error;
  }

}

async function getAllEditoriales() {
  try {
    const resultados = await BookDAO.obtenerTodasLasEditoriales();
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteBook(idLibro) {
  try {
    const resultados = await BookDAO.eliminarLibro(idLibro);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updateBook({
  idLibro,
  idEditorial,
  isbn,
  fechaPublicacion,
  titulo,
  edicion,
  numeroDePaginas,
  idioma,
  idAutor
}) {
  try {
    const bookToUpdate = {
      idLibro,
      idEditorial,
      isbn,
      fechaPublicacion,
      titulo,
      edicion,
      numeroDePaginas,
      idioma,
      idAutor
    };
    const result = await BookDAO.updateBook(bookToUpdate);
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getBookDetails,
  registerBook,
  findBook,
  getAllbooks,
  findLibrary,
  findLibraryByUser,
  getAllEditoriales,
  registerBookLibrary,
  deleteBookLibrary,
  deleteBook,
  updateBook
};