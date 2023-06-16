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
async function findBook(bookname) {
  try {
    const resultados = await BookDAO.obtenerLibro(bookname);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
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

module.exports = {
  getBookDetails,
  registerBook,
  findBook
};