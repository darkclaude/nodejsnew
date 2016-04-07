var fs = require('fs');
var User            = require('../app/models/user').User;
var Data = require('../app/models/data').Data;

//fs.appendFile('logs.txt', req.path + "Token" + req.query.access_token + "\n"), function(err){
//}
var jwt = require('jsonwebtoken');
var c = 0;


module.exports = function(router,passport){
	router.use(function(req, res, next){
req.logout();
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token){
	//if(token == "gida"){
	//next();
	//}
		jwt.verify(token, "ahhdebussy", function(err, decoded){
			if(err){
				return res.send("InvalidToken");
			}
			else{
				req.decoded = decoded;
				next();
			}
		});
	} else{
		return res.status(403).send("NoToken");
	}
	
});
	
	var ty = "sd";
	var d="";
var checkst = setInterval(function(){

	if(d==c){
		datalist.temp="nan";
		datalist.hum="nan";
		datalist.pot="nan";
	}
d=c;
},10000);
var datalist = {
	temp: 'nan',
	hum:  'nan',
	pot: 'nan'
};


router.post('/err/:t/:i', function(req, res){
var err = req.params.t;
var id = req.params.i;
if(err == "sf" ){
	console.log("Sensor Failure From: "+id);
}
else{
console.log("Unknown Error From "+id);
}
});
var cmdms ="null";

router.get('/node/:d/:t/:h/:k', function(req, res){

	var pot = req.params.d;
	var temp = req.params.t;
	var h = req.params.h;
	var iden = req.params.k;
	  Data.findOne({ 'local.username' :  iden}, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            

            // all is well, return successful user
			if(user){

           user.local.humidity = h;
	       user.local.temp = temp;
	       user.local.pot = pot;
			}
			
            return done(null, user);
        });
	
	console.log("From: "+iden+" Temp: "+temp+" Hum: "+h+" Pot-> "+pot+" Req Count: "+c);
		res.send("From: "+iden+" Temp: "+temp+" Hum: "+h+" Pot-> "+pot+" Req Count: "+c);
});
router.get('/cmds', function(req,res){
res.send(cmdms);
cmdms="null";
});
router.post('/angData/:nm', function(req, res){
	var t = req.params.nm;
	 Data.findOne({ 'local.username' :  t}, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            

            // all is well, return successful user
			if(user){
res.json(user)
			}
			
            return done(null, user);
        });
	//res.json(datalist);
});
router.post("/cmdData/:x", function(req, res){
cmdms = req.params.x;
res.send("Command Set");
});
router.get('/cmdDataA/:d', function(req, res){
cmdms = req.params.d;
res.send("+");

});
var fg=0;
router.post('/androData', function(req, res){
	fg=fg+1;
	//res.send("C,"+fg);
	res.send(datalist.pot+","+datalist.temp+","+datalist.hum);
});
router.get('/as',function(req,res){
	fg=fg+1;
res.send(datalist.pot+","+datalist.temp+","+datalist.hum);
});
router.get('/kasim', function(req, res){
res.send("Hello");
});
router.get('/Ureq/:name/', function(req, res){
res.json(datalist);
});
router.post('/st',function(req, res){
	res.send("aha");
	console.log("im alive");
});
router.get('/androAccount/:user', function(req, res){
var us = req.params.user;
  User.findOne({ 'local.username' :  us }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                throw err;

            // if no user is found, return the message
            if (!user)
                res.send('User Not Registered!');

            // if the user is found but the password is wrong
          if(user){
          	res.send(user._id+","+user.local.password+","+user.local.token);
       
          }

            // all is well, return successful user
        });


});
router.get('/test', function(req, res){
	res.send("VOILA!");
});
};