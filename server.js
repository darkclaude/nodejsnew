var express = require('express');
var User            = require('./app/models/user').User;
var app = express();
var app2 =  express();
var port  = process.env.OPENSHIFT_NODEJS_PORT;
var bcrypt = require('bcrypt');
var bodyParser  = require('body-parser');
var configDB = require('./config/database.js');
var mongoose   = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var jwt = require('jsonwebtoken');
var flash = require('connect-flash');
var pt = "Not Available";
  var state = 'f';
require('./config/passport')(passport);
var st ="";
var connection_string = '127.0.0.1:27017/nodekeyz';
// if OPENSHIFT env variables are present, use the available connection info:
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
  
mongoose.connect("mongodb://"+connection_string+"/nodekeyz");
admindb = mongoose.createConnection("mongodb://"+connection_string+"/admins");

app.use('/favicon.ico', express.static('views/favicon.ico'));
app.use('/auth',express.static(__dirname + '/views'));
app.use('/house', express.static(__dirname + '/views'));
app.use('/403', express.static(__dirname + '/views'));
app.use('/apanel', express.static(__dirname + '/views'));
app.use('/profile', express.static(__dirname + '/views'));
app.use('/dash', express.static(__dirname + '/views'));
app.use('/', express.static(__dirname + 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app2.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'anystringoftext',
	            saveUninitialized: true,
	            resave: true,
	            store: new MongoStore({  url:"mongodb://"+connection_string+"/sessions"})
	          }));



app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./app/models/user');
require('./app/models/admin');
app.set('view engine', 'ejs');
var ip = express.Router();
var auth = express.Router();
var adminf = express.Router();
require('./app/auth.js')(auth, passport,app);
require('./app/secureA.js')(adminf,app);
var api = express.Router();
var andro = express.Router();
app2.use('/andrologin',andro)
app.use('/auth', auth);
var secure = express.Router();
require('./app/secure.js')(secure,app, passport);
app.use('/apanel', adminf);
app2.get('/errors', function(req, res){
res.json('letter o');
});

app2.post('/control/on', function(req, res){
state = 'o';
res.send("ok");
});

app2.post('/control/off', function(req, res){
state= 'f';
res.send("ok");
});
var house = express.Router();
app.use('/', secure);
app2.use('/api', api);
app2.use('/m', app);
app2.use('/ip',ip);
app2.use('/new', house);
app2.use('/', app);
app.get('/', function(req, res){
	res.redirect('/auth');
});

house.get('/', function(req, res){
res.json(state);
});


andro.get('/:u/:p', function(req, res){
	var un = req.params.u;
	var ps = req.params.p;
	  // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  un }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                throw err;

            // if no user is found, return the message
            if (!user)
                res.send('User Not Registered!');

            // if the user is found but the password is wrong
          if(user){
          	 if(bcrypt.compareSync(ps, user.local.password)){
                 res.send("a,"+user.local.token);
          	 	}
          	 	else{
          	 		res.send("InCorrect PassWord! Try Again.");
          	 	}
          }

            // all is well, return successful user
        });

}); 
require('./app/api.js')(api, passport);
 // app.use('/', function(req, res){
// 	res.send('Our First express PROGRAM');
// 	console.log(req.cookies);
// 	console.log('==========');
// 	console.log(req.session);
// });
app2.listen(port, process.env.OPENSHIFT_NODEJS_IP);

//console.log('Server @ = '+port);
 