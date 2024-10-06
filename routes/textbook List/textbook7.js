var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook7', { title: 'Textbook7', session: req.session });
});

module.exports = router;
