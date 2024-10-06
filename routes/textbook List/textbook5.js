var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook5', { title: 'Textbook5', session: req.session });
});

module.exports = router;
