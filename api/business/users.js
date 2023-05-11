const UserDAO = require('../data/user_dao');

async function loginUser(username, password) {
  try {
    const resultados = await UserDAO.obtenerUsuarios(username, contrasenia);
    const usuarios = resultados.map((resultado) => ({
      id: resultado.id,
      nombre: resultado.nombre
      // Agrega las propiedades que desees obtener del resultado de la consulta
    }));

    // Aquí puedes realizar cualquier acción con el objeto 'usuarios'
    return usuarios;

  } catch (error) {
    console.error(error);
  }
}

async function updatePassword(username, oldPassword, newPassword) {
  return true;
}
module.exports = {
  loginUser,
};