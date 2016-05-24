var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var ReplySchema = new Schema({
	postId:String,
	ImgDir:String,
	comment:String,
	user: String,
	created:{type:Date, default:Date.now}
});

module.exports =  mongoose.model('Replies',ReplySchema);