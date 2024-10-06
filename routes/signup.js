var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Sign Up', session: req.session });
});
  
router.post('/', function(req, res) {
    const { firstname, lastname, email, password } = req.body;

    User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
    .then(() => {
        res.send('<script>alert("Registration successful! Redirecting to login page..."); window.location.href = "/";</script>');
    })
    .catch(error => {
        console.error('Error executing query: ', error);
        res.status(500).send('Error executing query');
    });
});

module.exports = router;
