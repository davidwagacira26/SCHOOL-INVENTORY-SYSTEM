const express = require('express');
const router = express.Router();
const Textbook = require('../textbooksController');

router.get('/', function(req, res, next) {
  res.render('barcodescan', { title: 'BarcodeScan', session: req.session });
});
router.post('/scan', async function(req, res) {
  const { barcode } = req.body;
  console.log('Received barcode:', barcode); 
  try {
    const textbook = await Textbook.getTextbookByBarcode(barcode);
    console.log('Textbook found:', textbook); 
    if (textbook) {
      res.json(textbook);
    } else {
      res.status(404).json({ error: 'Textbook not found' });
    }
  } catch (error) {
    console.error('Error retrieving textbook information:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

module.exports = router;
