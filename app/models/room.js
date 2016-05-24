var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var RoomSchema = new Schema({
	room:String,
	host:String,
	created:{type:Date, default:Date.now}
});

module.exports =  mongoose.model('Rooms',RoomSchema);