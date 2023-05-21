const connection = require('./db_connection');

function dejarResenia(idUsuario, resenia) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO resenia SET ?';
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

function obtenerReseniasReportadas() {
  return new Promise((resolve, reject) => {
    const sql = '';
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

function eliminarResenia(idReseña) {
  return new Promise((resolve, reject) => {
    const sql = '';
    const values = [idResenia];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function reportarResenia(idResenia, idUsuario){
  return new Promise((resolve, reject) => {
    const sql = '';
    const values = [idResenia, idUsuario];

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
  dejarResenia,
  obtenerReseniasReportadas,
  eliminarResenia,
  reportarResenia
}