function isAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.user_id) {
      return next();
    } else {
      res.redirect('/');
    }
  }
  
  module.exports = isAuthenticated;