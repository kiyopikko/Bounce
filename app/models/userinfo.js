var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;
var UserInfoSchema = new Schema({
	username:String,
	city:String,
	music:String,
	message:String
}, 
{
    timestamps:true
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);