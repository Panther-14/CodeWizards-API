const connection = require('./db_connection');

function accederUsuario(nombreUsuario, contrasenia) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    const values = [nombreUsuario, contrasenia];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function registroUsuario(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuarios SET ?';

    connection.query(sql, user, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function obtenerUsuario(nombreUsuario) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT idUsuario, username, nombre, apellidoPaterno, apellidoMaterno, email, tipoUsuario FROM usuarios WHERE username LIKE ? OR nombre LIKE ?';
    const values = [`%${nombreUsuario}%`, `%${nombreUsuario}%`];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function obtenerPerfilUsuario(nombreUsuario) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT idUsuario, username, nombre, apellidoPaterno, apellidoMaterno, email, tipoUsuario FROM usuarios WHERE nombre_usuario = ?';

    connection.query(sql, nombreUsuario, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}


function obtenerEmailTodosUsuarios() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT email FROM usuarios';

    connection.query(sql, nombreUsuario, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  accederUsuario,
  registroUsuario,
  obtenerUsuario,
  obtenerPerfilUsuario,
  obtenerEmailTodosUsuarios
};