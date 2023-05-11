const { Router } = require('express');
const router = Router();

// Endpoint de inicio
router.get('/', (req, res) => {
  //res.send('Bienvenido a mi API');
  res.send('index.html');
});

//Endpoint WildCard
router.all('*', (req, res) => {
  res.status(404).json({ error: true, message: "NO EXISTE PRRO" });
});

module.exports = router;