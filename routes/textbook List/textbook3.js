var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook3', { title: 'Textbook3', session: req.session });
});

module.exports = router;
