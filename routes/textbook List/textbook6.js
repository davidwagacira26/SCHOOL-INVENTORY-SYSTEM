var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook6', { title: 'Textbook6', session: req.session });
});

module.exports = router;
