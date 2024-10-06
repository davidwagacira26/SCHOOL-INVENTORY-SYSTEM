const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

router.get('/', async (req, res, next) => {
    try {
        const inventoryItems = await InventoryItem.findAll();

        res.render('availableitems', { title: 'Available Items', inventoryItems });
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).send('Error fetching inventory items');
    }
});

module.exports = router;
