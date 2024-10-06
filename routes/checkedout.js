var express = require('express');
var router = express.Router();
const CheckoutRecord = require('../models/CheckoutRecord'); 

router.get('/', async function(req, res, next) {
    try {

        const checkoutRecords = await CheckoutRecord.findAll({
            attributes: ['student_id', 'student_name', 'item_name']
        });

        res.render('checkedout', { title: 'CheckedOut', session: req.session, checkoutRecords: checkoutRecords });
    } catch (error) {
        console.error('Error fetching checked-out records:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    try {
        const { student_id, student_name, item_name, item_id, check_out_date } = req.body;

        const newRecord = await CheckoutRecord.create({
            student_id,
            student_name,
            item_name,
            item_id,
            check_out_date,
        });

        res.json(newRecord);
    } catch (error) {
        console.error('Error adding new checkout record:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
