const passport = require("passport")
const user = require("../models/user")

userController = {}
//======================
// AUTH ROUTES
//======================

userController.signup = function(req, res) {
    let email = req.body.data['email'];
    let name = req.body.data['first_name'];
    let password = req.body.data['password'];
    let verification = false;
    let isDriver = false;

    user.register(new user({
      username: email,
      name: name,
      verification: verification,
      isDriver: isDriver
    }), password, function(err, user){
        if (err){
            res.send({
              'success': false,
              'message': err
            })
        }
        passport.authenticate("local")(req, res, function(){
            res.send({
              'success': true,
              'user': user
            });
        });
    });
};

userController.login = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
    if (err) { res.json(err) }
    if (!user) { res.send({'success': false, 'message': 'no user'}) }
    req.logIn(user, function(err) {
      if (err) { res.send({'success': false, 'message': err}) }
      res.send({'success': true, 'user': user})
    });
    });
};

module.exports = userController;
