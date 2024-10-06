var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook4', { title: 'Textbook4', session: req.session });
});

module.exports = router;
