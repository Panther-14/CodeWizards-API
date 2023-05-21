const ReviewDAO = require('../data/review_dao');

async function getReportedReviews(username, password) {
  try {
    const resultados = await ReviewDAO.obtenerReseniasReportadas();
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteReview(idResenia) {
  try {
    const resultados = await ReviewDAO.eliminarResenia(idResenia);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function leaveReview(idUsuario, resenia) {
  try {
    const resultados = await ReviewDAO.dejarResenia(idUsuario, resenia);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reportReview(idUsuario, resenia) {
  try {
    const resultados = await ReviewDAO.reportarResenia(idUsuario, resenia);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  getReportedReviews,
  deleteReview,
  leaveReview,
  reportReview
};