var mongoose           = require('mongoose');
var Schema             = mongoose.Schema;
var NotificationSchema = new Schema({
    username: String,
    notifications:[]
    },
    {
      timestamps:true
    }
    );

module.exports =  mongoose.model('Notice', NotificationSchema);