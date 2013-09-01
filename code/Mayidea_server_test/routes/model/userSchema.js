
//The permitted SchemaTypes are
//String
//Number
//Date
//Buffer
//Boolean
//Mixed
//ObjectId
//Array

var mongoose = require('mongoose');
exports.userSchema = function(){
	
	var Schema = mongoose.Schema;
		
	var userSchema = new Schema({
		uid:Number,
		fb_id:Number,
		email:String,
		password:String,
		user_name:String,
		create_date:Date,
		modified_date:Date,
		access_token:String	
	});
	return userSchema;	
};