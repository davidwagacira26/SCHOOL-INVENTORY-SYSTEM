var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook11', { title: 'Textbook11', session: req.session });
});

module.exports = router;
