var express = require('express');
var router = express.Router();

const InventoryStatus = require('../models/CheckoutRecord');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.user_id) {
        return next();
    } else {
        res.redirect('/');
    }
}

router.get('/', isAuthenticated, async function(req, res, next) {
    try {
        const inventorystatus = await InventoryStatus.findAll();
        res.render('dashboard1', { title: 'AdminDashboard', session: req.session, inventorystatus: inventorystatus });
    } catch (error) {
        console.error('Error fetching inventory status:', error);
        res.render('error', { error: error });
    }
});

module.exports = router;
