 var express = require('express');
 var Admin = require('./models/admin').Admin;
 var User = require('./models/user').User;
 var t = "0";
 module.exports = function(router,app){
router.use(function(req, res, next){
	if(!req.user){
		res.redirect('/auth/admin-login');
	}
	
	else{
		var name = req.user.local.username;
		// we are checking to see if the user trying to login already exists
        Admin.findOne({ 'local.username' :  name}, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

             if(!user){
             		res.render('na.ejs');
             	}                      
             if(user){
             	 t = "1";
                 	return next();

             	console.log("Found one match = "+ t);
              }
        });

        		}

});
 
router.get('/', function(req, res){
app.use(express.static(__dirname+ '/views'));
res.render('apanel.ejs');
});
router.delete('/delete/:ida',function(req, res){
var id = req.params.ida;
User.findByIdAndRemove(id, function (err,user){
    if(err) { throw err; }
   
});
var users = {};
	  var usernames = {};
	  var ind=0;

   User.find({},'local.username', function(err, users) {
       // res.send(users.reduce(function(userMap, item) {
       //     userMap[item.id] = item;
       //     return userMap;
       // }, {}));
        var s = users.length;
        for(var i=0; i<s; i++){
        	usernames[i] = users[i].local.username;
       // console.log(users[i].local.username);
    }
     for(var i=0; i<s; i++){
        	
        console.log(usernames[i]);
    }
    res.send(users);
    

    });
});
router.delete('/deleteA/:ida',function(req, res){
var id = req.params.ida;
Admin.findByIdAndRemove(id, function (err,user){
    if(err) { throw err; }
    res.send("ok");
});
});
router.post('/logout',function(req, res){
	req.logout();
	res.redirect('/auth');
});
router.post('/editu/:ia',function(req, res){
var ida = req.params.ia;
User.findOne({'_id' : ida}, function (err, user){
if(err) {throw err;}
if(user){
	res.send(user);
}
if(!user){
res.send("null");
}
});

});
 // ...
router.post('/updateuser/:a', function(req, res){
var ref = req.params.a;
var idu = ref.length;
var name = "";
var pog="";
for(var i =0 ; i<24; i++){
	pog+= ref[i];
}
for(var i =24 ; i<idu; i++){
	name+= ref[i];
}

var query = {"_id": pog};
var update = {local: {username: name}};
var options = {new: true};
User.findOneAndUpdate(query, update, options, function(err, person) {
  if (err) {
    console.log('got an error');
  }
  res.send("ok");
});
Admin.findOne({'_id' : pog}, function (err, user){
if(err) {throw err;}
if(user){
	var query = {"_id": pog};
var update = {local: {username: name}};
	Admin.findOneAndUpdate(query, update, options, function(err, person) {
  if (err) {
    console.log('got an error');
  }
});
	}
if(!user){

}
});

});
router.post('/data', function(req, res){
	console.log(req.user);
	console.log(req.session);
	
  var users = {};
	  var usernames = {};
	  var ind=0;

   User.find({},'local.username', function(err, users) {
       // res.send(users.reduce(function(userMap, item) {
       //     userMap[item.id] = item;
       //     return userMap;
       // }, {}));
        var s = users.length;
        for(var i=0; i<s; i++){
        	usernames[i] = users[i].local.username;
       // console.log(users[i].local.username);
    }
     for(var i=0; i<s; i++){
        	
        console.log(usernames[i]);
    }
    res.send(users);
    

    });
});

router.post('/data2', function(req, res){
	console.log(req.user);
	console.log(req.session);
	
  var users = {};
	  var usernames = {};
	  var ind=0;

   Admin.find({},'local.username', function(err, users) {
       // res.send(users.reduce(function(userMap, item) {
       //     userMap[item.id] = item;
       //     return userMap;
       // }, {}));
        var s = users.length;
        for(var i=0; i<s; i++){
        	usernames[i] = users[i].local.username;
       // console.log(users[i].local.username);
    }
     for(var i=0; i<s; i++){
        	
        console.log(usernames[i]);
    }
    res.send(users);
    

    });
});

router.post('/ma/:uid', function(req, res){
	console.log(req.user);
	console.log(req.session);
	Admin.findOne({'_id': req.params.uid}, function(err, us){
if(us){
res.send('dsf');	
}
if(!us){
   User.findOne({'_id' : req.params.uid}, function(err, user) {
 if(user){
 	var tp = new Admin();
 	tp._id = req.params.uid;
 	tp.local.username=user.local.username;
 	tp.local.password=user.local.password;
  tp.save(function(err) {
                    if (err)
                        throw err;
                    });
	res.send("done");
}
 	 
    });
};
});

	});
	router.post('/rv/:uid', function(req, res){
	console.log(req.user);
	console.log(req.session);

   User.findOne({'_id' : req.params.uid}, function(err, user) {
 if(user){
 	user.local.token = "nan";
  user.save(function(err) {
                    if (err)
                        throw err;
                    });
	res.send("done");
}
 	 
    });
});

 
	
 };