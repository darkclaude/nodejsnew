var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
		token: String,
		ls: String,
	}

	
});
var tokenSchema = mongoose.Schema({
	value: String,
	user:{
		type: Schema.Types.ObjectId,
		ref: 'User',

	},
	expireAt: {
		type: Date,
		expires: 60,
		default: Date.now
	}
})
userSchema.methods.generateToken = function(){

}
userSchema.methods.generateHash = function(password){
  return	bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}
var User = mongoose.model('User', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {User: User, Token: 'herro'};
module.exports = Models;