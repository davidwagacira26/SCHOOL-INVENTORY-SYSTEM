var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook9', { title: 'Textbook9', session: req.session });
});

module.exports = router;
