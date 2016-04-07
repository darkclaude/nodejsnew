var bcrypt = require('bcrypt');
var admindb = require('mongoose');
var Schema = admindb.Schema;
var userSchema = admindb.Schema({
	local: {
		username: String,
		password: String,
	}
	
});

userSchema.methods.generateToken = function(){

}
userSchema.methods.generateHash = function(password){
  return	bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}
var Admin = admindb.model('Admin', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Admin: Admin, Token: 'herro'};
module.exports = Models;