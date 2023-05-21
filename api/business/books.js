const BookDAO = require('../data/book_dao');

async function getBookDetails(bookName) {
  try {
    const resultados = await BookDAO.detallesLibro(bookName);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerBook({
  Editoriales_idEditoriales,
  isbn,
  fechaPublicacion,
  titulo,
  edicion,
  numeroDePaginas,
  idioma
}) {
  try {
    const bookToRegister = {
      Editoriales_idEditoriales,
      isbn,
      fechaPublicacion,
      titulo,
      edicion,
      numeroDePaginas,
      idioma,
    };
    const result = await BookDAO.registerBook(bookToRegister);
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getBookDetails,
  registerBook,
};