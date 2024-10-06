var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook1', { title: 'Textbook1', session: req.session });
});

module.exports = router;
