// load all the things we need
var jwt = require('jsonwebtoken');

var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var User            = require('../app/models/user').User;
var Admin = require('../app/models/admin').Admin;
var Data = require('../app/models/data').Data;

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        
           Admin.findById(id, function(err, user) {
             if(user){
            done(err, user);
}
else{
    User.findById(id, function(err, user) {
            done(err, user);
        });
    
}
        }); 
        
        
    
    
      
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        var a = req.body.passwordc.length;
        var b = password.length;
        var c =  a+b;

        User.findOne({ 'local.username' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } 
           

            else if(req.body.passwordc!=password){
                return done(null, false, req.flash('signupMessage', ' Password Mismatch! Try Again'));
            }
              else if(req.body.passwordc == password && c<16 ){
                return done(null, false, req.flash('signupMessage', 'Password Too Short 8 characters minimum!'));
;            }
            else {

                // if there is no user with that email
                // create the user
                if(req.body.email=="boss"){
                    var newAdmin= new Admin();
                    newAdmin.local.username = email;
                    newAdmin.local.password  = newAdmin.generateHash(password);
                                    newAdmin.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newAdmin);
                });
                }
                else{
                var newUser    = new User();
              var newData = new Data();

                // set the user's local credentials
                newUser.local.username    = email;
                newData.local.username =  email;
                newData.local.temp ="nan";
                newData.local.humidity = "nan";
                newData.local.pot ="nan";
                newUser.local.password = newUser.generateHash(password);
           
                  var token = jwt.sign(newUser, "ahhdebussy",{
                    expiresInMinutes: 1440*30
                });
                       newUser.local.token= token;
                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
                   newData.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newData);
                });
            }
            }

        });    

        });

    }));
   passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
			if(user.local.token=="nan"){
			user.local.token="No Token";
			   user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
			}
		
    return done(null, user);
        
        });

    }));
 passport.use('admin-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form


        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Admin.findOne({ 'local.username' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessag', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessag', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return done(null, user);
        });

    }));


 passport.use('android-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return done(null, user);
        });

    }));








};