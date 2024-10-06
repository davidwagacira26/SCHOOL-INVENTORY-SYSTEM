const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');
const CheckoutRecord = require('../models/CheckoutRecord');

router.get('/', async (req, res) => {
    try {
        const inventoryItems = await InventoryItem.findAll();
        const checkOutHistory = await CheckoutRecord.findAll();

        res.render('reports', { title: 'School Inventory System Reports', inventoryItems, checkOutHistory });
    } catch (error) {
        console.error('Error fetching data for reports:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
