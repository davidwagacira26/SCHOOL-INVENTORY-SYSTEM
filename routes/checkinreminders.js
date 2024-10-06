const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const moment = require('moment');
const CheckoutRecord = require('../models/CheckoutRecord');
const InventoryItem = require('../models/InventoryItem');
const Student = require('../models/Student');

router.get('/', async (req, res) => {
    try {
        const approachingCheckinDate = moment().add(3, 'days').toDate();

        const checkinReminders = await CheckoutRecord.findAll({
            where: {
                check_in_date: {
                    [Op.lt]: approachingCheckinDate 
                }
            },
            include: [
                {
                    model: InventoryItem, 
                    as: 'InventoryItem' 
                },
                {
                    model: Student, 
                    as: 'Student'
                }
            ]
        });

        res.render('checkinreminders', { title: 'Check-in Reminders', checkinReminders: checkinReminders });
    } catch (error) {
        console.error('Error fetching check-in reminders:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/checkin', async (req, res) => {
    try {
        const { checkout_id } = req.body;

        const checkoutRecord = await CheckoutRecord.findByPk(checkout_id);

        if (!checkoutRecord) {
            return res.status(404).json({ success: false, message: 'Checkout record not found' });
        }

        await checkoutRecord.destroy();

          const html = `
          <html>
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Success</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-image: url(/images/image1.jpg);
                  background-size: cover;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
              }
              .popup {
                  background-color: #f4f4f4;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
                  text-align: center;
              }
              h1 {
                  color: #4CAF50;
              }
              p {
                  color: #333333;
              }
              .redirecting {
                  color: #999999;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="popup">
              <h1>Success!</h1>
              <p>Item Checked in Successfully.</p>
              <p class="redirecting">Redirecting...</p>
          </div>

          <script>
              // Function to redirect after showing the pop-up message
              function redirect() {
                  window.location.href = '/checkinreminders';
              }
              // Automatically redirect after 1 seconds
              setTimeout(redirect, 1000);
          </script>
      </body>
      </html>
      `;

      res.send(html);
  } catch (error) {
      console.error('Unsuccessful:', error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/mark-checked-out', async (req, res) => {
});

module.exports = router;
