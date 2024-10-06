const express = require('express');
const router = express.Router();
const CheckoutRecord = require('../models/CheckoutRecord');


router.get('/', function(req, res, next) {
  res.render('overdue', { title: 'Overdue', session: req.session });
});


router.get('/', async (req, res) => {
    try {
        const overdueItems = await CheckoutRecord.findAll({
            where: {
                check_out_date: { $lt: new Date() } 
            }
        });

        res.json(overdueItems);
    } catch (error) {
        console.error('Error fetching overdue items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;