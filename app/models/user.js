var mongoose   = require('mongoose');
var bcrypt     = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String,
	}
}, 
{
      timestamps:true
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);