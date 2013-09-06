
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

exports.petSchema = function(){
var Schema = mongoose.Schema;
	
	var pet_profile = new Schema({
		id:Number,
		category:[String],
		create_date:Date,
		modified_date:Date,
		title:String,
		follow_count:Number,
		doodle:String
	});
	
	return pet_profile;
};

exports.userSchema = function(){
	
	var Schema = mongoose.Schema;
	
	var pet_profile = new Schema({
		id:Number,
		category:[String],
		create_date:Date,
		modified_date:Date,
		title:String,
		follow_count:Number,
		doodle:String
	});
	
		
	var userSchema = new Schema({
		id:Number,
		fb_id:Number,
		email:String,
		password:String,
		user_name:String,
		create_date:Date,
		modified_date:Date,
		access_token:String,
		profile_pic:String,
		mypet_profile:[pet_profile],
		subscribe:[String]
	});
	return userSchema;	
};