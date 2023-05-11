const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({ libros: 'Overlord' });
});

router.get('/Overlord', (req, res) => {
  res.json({ volumenes: 100 });
});

module.exports = router;