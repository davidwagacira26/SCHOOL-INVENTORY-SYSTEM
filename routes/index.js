var express = require('express');
var router = express.Router(); 
var User = require('../models/User'); 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login', session : req.session });
});

router.post('/login', async function(request, response, next){

    var email = request.body.email;
    var password = request.body.password;

    if(email && password) {
        try {
            const user = await User.findOne({ where: { email: email } });

            if (user) {
                if (user.password === password) {
                    request.session.user = {
                        user_id: user.user_id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    };

                    if (user.is_admin) {
                        response.redirect("/dashboard1"); 
                    } else {
                        response.redirect("/dashboard"); 
                    }
                    
                    return; 
                } else {
                    response.render('index', { title: 'Login', error: 'Incorrect Password', session: request.session });
                    return;
                }
            } else {
                response.render('index', { title: 'Login', error: 'Incorrect Email Address', session: request.session });
                return;
            }
        } catch (error) {
            console.error('Error during login:', error);
            response.render('index', { title: 'Login', error: 'An error occurred. Please try again later.', session: request.session });
            return;
        }
    } else {
        response.render('index', { title: 'Login', error: 'Please Enter Email Address and Password Details', session: request.session });
        return;
    }
});

router.get('/logout', function(request, response, next){

    
    request.session.destroy();

    response.redirect("/");

});

module.exports = router;
