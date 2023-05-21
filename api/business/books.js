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

module.exports = {
  getBookDetails,
};