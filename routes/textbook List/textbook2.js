var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook2', { title: 'Textbook2', session: req.session });
});

module.exports = router;
