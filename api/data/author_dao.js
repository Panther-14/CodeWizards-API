const connection = require('./db_connection');


function obtenerAutoresLibros(idLibro) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT a.* FROM autores a INNER JOIN autores_libros al ON a.idAutor = al.idAutor INNER JOIN libros l  ON al.idLibro = l.idLibro WHERE l.idLibro = ?;';
    const values = idLibro;

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function obtenerTodosLosAutores() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM autores;';

    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  obtenerAutoresLibros,
  obtenerTodosLosAutores
}