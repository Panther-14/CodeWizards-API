const connection = require('./db_connection');

function dejarResenia(idUsuario, resenia, valoracion) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO resenia (idResenia, descripcion, valoracion) VALUES (?, ?, ?)';
    const values = [idUsuario, resenia, valoracion];

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
    const sql = 'SELECT * FROM resenias INNER JOIN reportes ON reportes.idResenia = resenias.idResenia WHERE activa = ?;';
    const values = [0];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function eliminarResenia(idResenia) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE resenias SET activa = ? WHERE (idResenia = ?);';
    const values = [1, idResenia];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function reportarResenia(idUsuario,idResenia){
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO reportes (idResenia, idUsuario, fechaReporte) VALUES (?, ?, NOW());';
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

function obtenerReseniasLibro(idResenia, idLibro){
  return new Promise((resolve, reject) => {
    const sql = 'SELECT resenias.idResenia, idLibro, idUsuario, descripcion, valoracion FROM resenias INNER JOIN	libros_resenias ON resenias.idResenia = libros_resenias.idResenia WHERE libros_resenias.idLibro = ?;';
    const values = [idResenia, idLibro];

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
  reportarResenia,
  obtenerReseniasLibro
}