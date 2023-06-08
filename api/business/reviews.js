const ReviewDAO = require('../data/review_dao');

async function getReportedReviews() {
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

async function leaveReview(idUsuario, idLibro, resenia,valoracion) {
  try {
    const resultados = await ReviewDAO.dejarResenia(idUsuario, idLibro, resenia,valoracion);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function reportReview(idUsuario, idResenia) {
  try {
    const resultados = await ReviewDAO.reportarResenia(idUsuario, idResenia);
    return resultados;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getBookReviews(idLibro, idResenia) {
  try {
    const resultados = await ReviewDAO.obtenerReseniasLibro(idResenia,idLibro);
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
  reportReview,
  getBookReviews
};