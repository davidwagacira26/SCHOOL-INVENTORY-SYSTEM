const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

router.get('/', function(req, res, next) {
    res.render('update', { title: 'Update', session: req.session });
});

router.post('/', async (req, res) => {
    try {
        const { item_name, item_id, item_category, item_barcode, item_quantity } = req.body;

        const inventoryItem = await InventoryItem.findOne({ where: { item_id } });

        if (!inventoryItem) {
            throw new Error('Inventory item not found');
        }
        const updatedQuantity = inventoryItem.item_quantity + parseInt(item_quantity);
        await InventoryItem.update({ item_quantity: updatedQuantity }, { where: { item_id } });

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
                <p>Item added successfully.</p>
                <p class="redirecting">Redirecting...</p>
            </div>

            <script>
                // Function to redirect after showing the pop-up message
                function redirect() {
                    window.location.href = '/dashboard';
                }
                // Automatically redirect after 3 seconds
                setTimeout(redirect, 3000);
            </script>
        </body>
        </html>
        `;
        res.send(html);
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).send('Error updating inventory item');
    }
});

module.exports = router;
