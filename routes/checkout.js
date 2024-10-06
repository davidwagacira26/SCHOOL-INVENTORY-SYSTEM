const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require('../database');
const moment = require('moment');
const Student = require('../models/Student');
const CheckoutRecord = require('../models/CheckoutRecord');
const InventoryItem = require('../models/InventoryItem');


CheckoutRecord.belongsTo(Student, { foreignKey: 'student_id', as: 'Student' });

router.use(bodyParser.json());


router.get('/', async function(req, res, next) {
    try {

        const lowStockItems = await InventoryItem.findAll({
            where: {
                item_quantity: { $lt: 3 } 
            }
        });

        res.render('checkout', { title: 'CheckOut', session: req.session, lowStockItems: lowStockItems });
    } catch (error) {
        console.error('Error fetching low stock items:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', async function(req, res, next) {
    console.log('Request Body:', req.body); 

    const { selectedTextbooks, checkOutDate, checkInDate, studentId } = req.body;


    if (!studentId || !selectedTextbooks || !checkOutDate || !checkInDate) {
        console.error('Missing required data in request body');
        return res.status(400).send('Missing required data in request body');
    }

    if (!selectedTextbooks.length) {
        console.error('No selected textbooks found');
        return res.status(400).send('No selected textbooks found');
    }

    try {
        const student = await Student.findByPk(studentId);

        if (!student) {
            console.error('Student not found with ID:', studentId);
            return res.status(404).send('Student not found');
        }

        await sequelize.transaction(async (t) => {
            for (const textbook of selectedTextbooks) {
                const inventoryItem = await InventoryItem.findByPk(textbook.id);
                if (inventoryItem.item_quantity < 1) {
                    console.error('Item is out of stock:', inventoryItem.item_name);
                    return res.status(400).send(`Item ${inventoryItem.item_name} is out of stock`);
                }

                const formattedCheckOutDate = moment(checkOutDate).format('YYYY-MM-DD');
                const formattedCheckInDate = moment(checkInDate).format('YYYY-MM-DD');

                const [checkoutRecord, created] = await CheckoutRecord.findOrCreate({
                    where: { student_id: studentId, item_id: textbook.id },
                    defaults: {
                        student_name: student.student_name,
                        item_name: textbook.title,
                        check_out_date: formattedCheckOutDate,
                        check_in_date: formattedCheckInDate
                    },
                    transaction: t
                });

                await InventoryItem.update(
                    { item_quantity: sequelize.literal(`item_quantity - 1`) },
                    { where: { item_id: textbook.id }, transaction: t }
                );
            }
        });

        res.status(200).send('Checkout successful');
    } catch (error) {
        console.error('Error during checkout:', error);

        res.status(500).send('Error during checkout');
    }
});

router.post('/checkin', async (req, res) => {
    try {
        const { checkout_id } = req.body;

        const checkoutRecord = await CheckoutRecord.findByPk(checkout_id);

        if (!checkoutRecord) {
            return res.status(404).json({ error: 'Checkout record not found' });
        }

        checkoutRecord.check_in_date = new Date();
        await checkoutRecord.save();


        res.status(200).json({ success: true, message: 'Book returned successfully' });
    } catch (error) {
        console.error('Error during book return:', error);
        res.status(500).json({ success: false, message: 'Failed to return book. Please try again.' });
    }
});

module.exports = router;
