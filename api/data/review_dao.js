const connection = require('./db_connection');

function dejarResenia(idUsuario, resenia) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO resenia () VALUES(?,?,?)';
    const values = [idUsuario, resenia];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}