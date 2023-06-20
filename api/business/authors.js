const AuthorDAO = require('../data/author_dao');

async function findAutorsBook(idLibro) {
  try {
    const resultados = await AuthorDAO.obtenerAutoresLibros(idLibro);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getAllAuthors() {
  try {
    const resultados = await AuthorDAO.obtenerTodosLosAutores();
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  findAutorsBook,
  getAllAuthors
};