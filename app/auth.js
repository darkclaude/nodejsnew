module.exports = function(router, passport, app) {
	var express = require('express');
	 router.get('/', function(req, res){
	 	res.render('index.ejs');
	 });

	 router.get('/login', function(req,res){
	 	req.logout();
	 	res.render('login.ejs', {message: req.flash('loginMessage')})
	 });

	 router.post('/login', passport.authenticate('local-login',{
	 	successRedirect: '/profile',
	 	failureRedirect: '/auth/login',
	 	failureFlash: true
	 }));
	
	  router.get('/admin-login',isLoggedIn, function(req,res){
	 	req.logout();
	 	res.render('loginA.ejs', {message: req.flash('loginMessag')})
	 });

	 router.post('/admin-login', passport.authenticate('admin-login',{
      successRedirect: '/apanel',
      failureRedirect: '/auth/admin-login',
      failureFlash: true
	 }));

 
	  router.post('/login/android', passport.authenticate('android-login',{
	 	successRedirect: '/Aprofile',
	 	failureRedirect: '/Flogin',
	 	failureFlash: false
	 }));
	
router.get('/signup', function(req, res){
	res.render('signup.ejs', {message: req.flash('signupMessage')});

});
router.post('/signup', passport.authenticate('local-signup',{
	successRedirect: '/auth',
	failureRedirect: '/auth/signup',
	failureFlash: true
}));
//router.get('/profile', isLoggedIn, function(req, res){
//	res.render('profile.ejs',{user: req.user});
//});
	 router.get('/:username/:password', function(req, res){// Experimental LOgin Not To Be USed!!!!
	 	var newUser = new User();
         newUser.local.username = req.params.username;
         newUser.local.password  = req.params.password;
         console.log(newUser.local.username + " " + newUser.local.password);
         newUser.save(function(err){
         	if(err) throw err;
      
         });
         res.send('Success!');
	 });
	 router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
	 });
	 router.get('/logout2', function(req, res){// Am coming to You??!!!
	 	req.logout();
	 	req.flash('loginMessage', 'Registration Complete Sign In!');
res.redirect('/login');
	 });

};

	 function isLoggedIn(req,res,next){// if Admin already Logged GET to admin-login route redirects to /apanel
	if(req.isAuthenticated()){
		res.redirect('/apanel');
	}
	return next();
}
