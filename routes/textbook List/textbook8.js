var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('textbook8', { title: 'Textbook8', session: req.session });
});

module.exports = router;
