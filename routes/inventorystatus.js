const express = require('express');
const router = express.Router();
const CheckoutRecord = require('../models/CheckoutRecord');
const Student = require('../models/Student');
const InventoryItem = require('../models/InventoryItem');
const isAuthenticated = require('./authMiddleware');

router.get('/', isAuthenticated, async function(req, res, next) {
    try {
        const inventorystatus = await CheckoutRecord.findAll({
            include: [
                { model: Student, as: 'Student', attributes: ['student_id', 'student_name'] },
                { model: InventoryItem, as: 'InventoryItem', attributes: ['item_id', 'item_name'] }
            ],
            order: [['check_out_date', 'DESC']]
        });
        res.render('inventorystatus', { title: 'Recent Activity', inventorystatus });
    } catch (error) {
        console.error('Error fetching recent activity:', error.message);
        res.status(500).send('Internal server error: Failed to fetch recent activity');
    }
});

module.exports = router;
