var express = require('express');
var router = express.Router();
var isAuthenticated = require('./authMiddleware');
var User = require('../models/User');

router.get('/', isAuthenticated, async function(req, res, next) {
    try {
        const users = await User.findAll();
        const adminUserFound = checkIfAdminUserExists(users);
  
        res.render('usermanagement', { title: 'User Management', users: users, adminUserFound: adminUserFound });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send('Internal Server Error');
    }
});
  
router.post('/:id/delete', isAuthenticated, async function(req, res, next) {
    const userId = req.params.id;
  
    try {
        const user = await User.findByPk(userId);
  
        if (!user) {
            return res.status(404).send('User not found');
        }
  
        await user.destroy();
  
        return res.redirect('/usermanagement');
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).send('Internal Server Error');
    }
});

function checkIfAdminUserExists(users) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === 'davidwagacira@gmail.com') {
            return true;
        }
    }
    return false;
}

module.exports = router;
