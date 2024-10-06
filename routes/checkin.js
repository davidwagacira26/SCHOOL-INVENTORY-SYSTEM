const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const CheckoutRecord = require('../models/CheckoutRecord');
const Student = require('../models/Student');
const InventoryItem = require('../models/InventoryItem');
const isAuthenticated = require('./authMiddleware');


router.get('/', function(req, res, next) {
  res.render('checkin', { title: 'Checkin', session: req.session });
});

router.post('/', isAuthenticated, async (req, res) => {
  const { student_id, item_id } = req.body;

  try {
    const checkoutRecord = await CheckoutRecord.findOne({
      where: {
        student_id: student_id,
        item_id: item_id,
        check_in_date: {
          [Op.ne]: null 
        }
      },
      include: [{ model: Student, as: 'CheckoutStudent' }] 
    });

    if (!checkoutRecord) {
      return res.status(404).json({ error: 'No checked-out record found for the given student and item' });
    }

    await checkoutRecord.destroy();


    const inventoryItem = await InventoryItem.findByPk(item_id);
    if (inventoryItem) {
      await inventoryItem.update({ item_quantity: inventoryItem.item_quantity + 1 });
    }


    return res.status(200).json({ success: true, message: 'Check-in successful' });
  } catch (error) {
    console.error('Error during check-in:', error);
    
    return res.status(500).json({ success: false, message: 'Failed to check in item. Please try again.' });
  }
});

module.exports = router;
