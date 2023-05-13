const connection = require('./db_connection');

function obtenerUsuarios(nombreUsuario, contrasenia) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ? AND contrasenia = ?';
    const values = [nombreUsuario, contrasenia];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  obtenerUsuarios,
};