const connection = require('./db_connection');

function detallesLibro(nombreLibro){
  return new Promise((resolve,reject) => {
    const sql = 'SELECT * FROM libros WHERE nombre = ?';
    const values = [nombreLibro];

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
  detallesLibro,
}