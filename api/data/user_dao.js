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
    const sql = 'CALL RegistrarUsuario(?,?,?,?,?,?,?)';
    const values = [
      user.username,
      user.email,
      user.nombre,
      user.apellidoPaterno,
      user.apellidoMaterno,
      user.password,
      user.tipoUsuario
    ]

    connection.query(sql, user, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function actualizarUsuario({ idUsuario, nombre, apellidoPaterno, apellidoMaterno, email, contrasena }) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, email = ? WHERE idUsuario = ? AND password = ?';
    const values = [nombre, apellidoPaterno, apellidoMaterno, email, idUsuario, contrasena];

    connection.query(sql, values, (error, results, fields) => {
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
    const sql = 'SELECT idUsuario, username, nombre, apellidoP, apellidoMaterno, email, tipoUsuario FROM usuarios WHERE username = ?';

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

    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function obtenerEmailUsuario(username, email) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT email FROM usuarios WHERE username = ? AND email = ?';
    const values = [username, email];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function cambiarContrasenia(idUsuario, viejaContrasenia, nuevaContrasenia) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET password = ? WHERE idUsuario = ? AND password = ?';
    const values = [nuevaContrasenia, idUsuario, viejaContrasenia];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function recuperarContrasenia(username, nuevaContrasenia, otp) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET password = ? WHERE username = ? AND otp = ?';
    const values = [nuevaContrasenia, username, otp];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function insertarContraseniaTemporal(otp, username) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET otp = ? WHERE username = ?';
    const values = [otp, username];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function eliminarUsuario(idUsuario) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE usuarios SET eliminado = ? WHERE idUsuario = ?;';
    const values = [1, idUsuario];

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
  accederUsuario,
  registroUsuario,
  actualizarUsuario,
  obtenerUsuario,
  obtenerPerfilUsuario,
  obtenerEmailTodosUsuarios,
  obtenerEmailUsuario,
  cambiarContrasenia,
  recuperarContrasenia,
  insertarContraseniaTemporal,
  eliminarUsuario
};
