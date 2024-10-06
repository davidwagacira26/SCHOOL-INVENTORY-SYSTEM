const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const { Op } = require('sequelize');
const { io } = require('../app');

router.get('/', async (req, res, next) => {
  try {
    const lowStockItems = await InventoryItem.findAll({
      where: {
        item_quantity: { [Op.lte]: 3 }
      }
    });

    if (io) { 
      io.emit('lowStockUpdate', lowStockItems);
    } else {
      console.info('Socket.IO not initialized, skipping low stock update event.');
    }

    res.render('lowstocks', { title: 'Low Stocks', lowStockItems });
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
