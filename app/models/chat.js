var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var ChatSchema = new Schema({
    room: String,
    message: String,
    user: String,
    created: {type:Date, default: Date.now}
});

module.exports =  mongoose.model('Chat', ChatSchema);