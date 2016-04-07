 var express = require('express');
 var re;
 var pt = 'NOT AVAILABLE';
 var state = 'o';
 module.exports = function(router,app,passport){
router.use(function(req, res, next){
	re = req;
	
		if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/auth');

});

router.get('/dash', function(req, res){
	//app.use('/dash', express.static(__dirname + '/views'));
	res.render('dash.ejs');
});
router.get('/anggetuser', function(req, res){
res.send(req.user.email);
});
router.get('/profile', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('profile.ejs',{user: req.user});
});
router.get('/house', function(req, res){
res.render('house.ejs')
});
//router.get('/403', function(req, res){
//	console.log(req.session);
//	//app.use('/403', express.static(__dirname + '/views'));
//	res.render('na.ejs');
//});


router.post('/value', function(req, res){
res.send(pt);
});


	 router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
	 });




 };