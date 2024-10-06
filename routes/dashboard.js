const express = require('express');
const router = express.Router();
const CheckoutRecord = require('../models/CheckoutRecord');
const Student = require('../models/Student');


router.get('/', async function(req, res, next) {
  try {
    const inventorystatus = await CheckoutRecord.findAll({
      include: [
        { model: Student, as: 'Student', attributes: ['student_id', 'student_name'] }
      ],
      order: [['check_out_date', 'DESC']]
    });

    res.render('dashboard', {
      title: 'Dashboard',
      session: req.session,
      inventorystatus: inventorystatus, 
      tableHeaders: ['student_id', 'student_name', 'item_name', 'item_id', 'check_out_date', 'check_in_date']
    });
  } catch (error) {
    console.error('Error fetching recent activity for dashboard:', error.message);
    res.status(500).send('Internal server error: Failed to fetch recent activity');
  }
});

module.exports = router;
