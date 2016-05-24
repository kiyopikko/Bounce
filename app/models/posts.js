var mongoose   = require('mongoose');
var Schema     = mongoose.Schema; 
var PostSchema = new Schema({
			comment:String, 
			user:String,
			likesAndUsers:[{user:String}],
			ImgDir:String,
			created:{type:Date,default:Date.now} 
}, 
{
    timestamps:true
});

module.exports = mongoose.model('Posts', PostSchema);