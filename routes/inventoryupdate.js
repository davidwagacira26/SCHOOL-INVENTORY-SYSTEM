const express = require('express');
const router = express.Router();
const isAuthenticated = require('./authMiddleware');
const InventoryItem = require('../models/InventoryItem');

router.get('/', isAuthenticated, async (req, res) => {
  try {
    
    const inventoryItems = await InventoryItem.findAll();

  
    res.render('inventoryupdate', { title: 'Inventory Update', session: req.session, inventoryItems: inventoryItems });
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).send('Failed to fetch inventory items');
  }
});

router.post('/:id', isAuthenticated, async (req, res) => {
  const itemId = req.params.id;
  const { item_name, item_category } = req.body;

  try {
    const item = await InventoryItem.findByPk(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    item.item_name = item_name;
    item.item_category = item_category;

    await item.save();
    res.redirect('/inventoryupdate');
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Failed to update item');
  }
});

router.post('/:id/delete', isAuthenticated, async (req, res) => {
  const itemId = req.params.id;

  try {

    const item = await InventoryItem.findByPk(itemId);
    if (!item) {
      return res.status(404).send('Item not found');
    }
    await item.destroy();
    res.redirect('/inventoryupdate');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Failed to delete item');
  }
});

module.exports = router;
