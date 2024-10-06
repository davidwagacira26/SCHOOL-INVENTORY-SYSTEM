var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook12', { title: 'Textbook12', session: req.session });
});

module.exports = router;
