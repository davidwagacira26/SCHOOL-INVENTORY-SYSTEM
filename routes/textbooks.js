var express = require('express');
var router = express.Router();
var isAuthenticated = require('./authMiddleware');
const InventoryItem = require('../models/InventoryItem');

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const textbooks = await InventoryItem.findAll({ where: { item_category: 'Book' } });
    
    res.render('textbooks', { title: 'Textbooks', session: req.session, textbooks: textbooks });
  } catch (error) {
    console.error('Error fetching textbooks:', error);
    res.status(500).send('Failed to fetch textbooks: ' + error.message);
  }
});

module.exports = router;
