const connection = require('./db_connection');

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

module.exports = {
  registerBook,
};