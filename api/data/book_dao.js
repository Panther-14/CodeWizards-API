const connection = require('./db_connection');
const moment = require('moment');

function detallesLibro(idbook) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM libros WHERE idbook = ?';
    const values = [idbook];

    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function registerBook(book) {
  return new Promise((resolve, reject) => {
    const formattedDate = moment(book.fechaPublicacion).format('DD-MM-YY');
    const insertBookSql = `INSERT INTO libros (idEditorial, isbn, fechaPublicacion, titulo, edicion, numeroDePaginas, idioma)
                            VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const bookValues = [
      book.idEditorial,
      book.isbn,
      formattedDate,
      book.titulo,
      book.edicion,
      book.numeroDePaginas,
      book.idioma
    ];
    
    connection.query(insertBookSql, bookValues, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      
      const idLibro = results.insertId; // Obtener el ID del libro insertado
      
      const insertAuthorBookSql = `INSERT INTO autores_libros (idAutor, idLibro)
                                   VALUES (?, ?);`;
      const authorBookValues = [
        book.idAutor,
        idLibro
      ];
      
      connection.query(insertAuthorBookSql, authorBookValues, (error, results) => {
        if (error) {
          reject(error);
          return;
        }        
        resolve(results);
      });
    });
  });
}

function obtenerLibro(bookname) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT *  FROM libros WHERE titulo LIKE ?';
    const values = `${bookname}%`;

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function obtenerTodosLibros() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT libros.*, autores.* FROM libros JOIN autores_libros ON libros.idLibro = autores_libros.idLibro JOIN autores ON autores_libros.idAutor = autores.idAutor;';

    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function obtenerLibroPorBiblioteca(idUsuario, idEstados) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT libros.* FROM libros JOIN usuarios_libros ON libros.idLibro = usuarios_libros.idLibro JOIN libros_estados ON usuarios_libros.idEstado = libros_estados.idEstados  WHERE usuarios_libros.idUsuario = ? AND libros_estados.idEstados = ?';
    const values = [idUsuario, idEstados];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function obtenerBibliotecaPorLibro(idUsuario, idLibro) {
  return new Promise((resolve, reject) => {
    const sql = 'Select libros.*, usuarios_libros.idEstado FROM usuarios_libros INNER JOIN libros ON usuarios_libros.idLibro = libros.idLibro WHERE usuarios_libros.idUsuario=? and usuarios_libros.idLibro=?';
    const values = [idUsuario, idLibro];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function guardarLibroBiblioteca(idUsuario, idLibro, idEstado) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO usuarios_libros (idUsuario,idLibro,idEstado) VALUES (?,?,?)';
    const values = [idUsuario, idLibro, idEstado];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function eliminarLibroBiblioteca(idUsuario, idLibro) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM usuarios_libros WHERE idUsuario = ? AND idLibro = ?;';
    const values = [idUsuario, idLibro];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function obtenerTodasLasEditoriales() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM editoriales;';

    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

function eliminarLibro(idLibro) {
  return new Promise((resolve, reject) => {
    const sql1 = 'START TRANSACTION;';
    const sql2 = 'DELETE FROM autores_libros WHERE idLibro = ?;';
    const sql3 = 'DELETE FROM libros WHERE idLibro = ?;';
    const sql4 = 'COMMIT;';
    connection.query(sql1, (error) => {
      if (error) {
        reject(error);
        return;
      }
      connection.query(sql2, [idLibro], (error, resultados1) => {
        if (error) {
          connection.query('ROLLBACK;', () => {
            reject(error);
          });
          return;
        }
        connection.query(sql3, [idLibro], (error, resultados2) => {
          if (error) {
            connection.query('ROLLBACK;', () => {
              reject(error);
            });
            return;
          }
          connection.query(sql4, (error) => {
            if (error) {
              connection.query('ROLLBACK;', () => {
                reject(error);
              });
              return;
            }
            const resultado = {
              resultados1,
              resultados2
            };
            resolve(resultado);
          });
        });
      });
    });
  });
}

function updateBook(book) {
  return new Promise((resolve, reject) => {
    const formattedDate = moment(book.fechaPublicacion).format('DD-MM-YY');
    const updateBookSql = `UPDATE libros
                           SET idEditorial = ?, isbn = ?, fechaPublicacion = ?, titulo = ?, edicion = ?, numeroDePaginas = ?, idioma = ?
                           WHERE idLibro = ?;`;
    const bookValues = [
      book.idEditorial,
      book.isbn,
      formattedDate,
      book.titulo,
      book.edicion,
      book.numeroDePaginas,
      book.idioma,
      book.idLibro
    ];
    
    connection.query(updateBookSql, bookValues, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      
      const idLibro = book.idLibro;
      
      const updateAuthorBookSql = `UPDATE autores_libros
                                   SET idAutor = ?
                                   WHERE idLibro = ?;`;
      const authorBookValues = [
        book.idAutor,
        idLibro
      ];
      
      connection.query(updateAuthorBookSql, authorBookValues, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        
        resolve(results);
      });
    });
  });
}


module.exports = {
  detallesLibro,
  registerBook,
  obtenerLibro,
  obtenerTodosLibros,
  obtenerLibroPorBiblioteca,
  obtenerTodasLasEditoriales,
  obtenerBibliotecaPorLibro,
  guardarLibroBiblioteca,
  eliminarLibroBiblioteca,
  eliminarLibro,
  updateBook
}