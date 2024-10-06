const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(404).send('User session not found');
  }

  res.render('profile', { title: 'Profile', user: req.session.user });
});

router.post('/changePassword', function(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).send('Unauthorized');
  }

  const newPassword = req.body.newPassword;

  
  res.status(200).send('Password updated successfully');
});

module.exports = router;
