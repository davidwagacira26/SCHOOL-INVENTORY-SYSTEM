var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook10', { title: 'Textbook10', session: req.session });
});

module.exports = router;
