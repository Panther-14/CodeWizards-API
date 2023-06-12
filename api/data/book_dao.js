const connection = require('./db_connection');

function detallesLibro(idbook) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM libros WHERE idbook = ?';
    const values = [idbook];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function registerBook(book) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO libros (Editoriales_idEditoriales, isbn, fechaPublicacion, titulo, edicion, numeroDePaginas, idioma) VALUES (?, ?, ?, ?, ?, ?, ?);';
    const values = [
      book.Editoriales_idEditoriales,
      book.isbn,
      book.fechaPublicacion,
      book.titulo,
      book.edicion,
      book.numeroDePaginas,
      book.idioma];
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function updateBook(book) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE libros SET IFNULL(?, Editoriales_idEditoriales), IFNULL(?, isbn), IFNULL(?, fechaPublicacion), IFNULL(?, titulo), IFNULL(?, edicion), IFNULL(?, numeroDePaginas), IFNULL(?, idioma) WHERE (idLibros = ?);';
    const values = [
      book.Editoriales_idEditoriales,
      book.isbn,
      book.fechaPublicacion,
      book.titulo,
      book.edicion,
      book.numeroDePaginas,
      book.idioma,
      book.idLibros];
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  registerBook,
  updateBook,
  detallesLibro,
};
