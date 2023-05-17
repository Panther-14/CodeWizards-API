const bookDAO = require('../data/book_dao');

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
    const result = await bookDAO.registerBook(bookToRegister);
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  registerBook,
};