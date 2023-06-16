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
    const sql = 'INSERT INTO libros (idEditorial, isbn, fechaPublicacion, titulo, edicion, numeroDePaginas, idioma) VALUES (?, ?, ?, ?, ?, ?, ?);';
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

function obtenerLibro(bookname) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT *  FROM libros WHERE titulo LIKE ?';
    const values = `${bookname}%`;

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}



module.exports = {
  detallesLibro,
  registerBook,
  obtenerLibro
}