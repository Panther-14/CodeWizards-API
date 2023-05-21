const UserDAO = require('../data/user_dao');

async function loginUser(username, password) {
  try {
    const resultados = await UserDAO.accederUsuario(username, password);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function registerUser(user) {
  try {
    const resultados = await UserDAO.registroUsuario(user);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function updatePassword(username, oldPassword, newPassword) {
  return true;
}

async function findUser(username) {
  try {
    const resultados = await UserDAO.obtenerUsuario(username);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function seeProfile(username) {
  try {
    const resultados = await UserDAO.obtenerPerfilUsuario(username);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  loginUser,
  registerUser,
  updatePassword,
  findUser,
  seeProfile
};