
var datadb = require('mongoose');
var Schema = data.Schema;
var userSchema = data.Schema({
	local: {
		username: String,
		temp: String,
		humidity: String,
		pot: String,
	}
	
});


var Data = datadb.model('Data', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Data: Data};
module.exports = Models;