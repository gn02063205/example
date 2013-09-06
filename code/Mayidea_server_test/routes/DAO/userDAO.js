
var mongoose = require('mongoose');

var autoinc = require('mongoose-id-autoinc');

var DbConnect = require('../model/DbConnect.js');

var schema = require('../model/userSchema.js');


exports.createUser = function(_email,_password,_name,result){
	
	var db = DbConnect.getConnect();//db 連線
	autoinc.init(db); //初始化autoinc 選擇db 
		
	//user model
	var userSchema = schema.userSchema();//套用user schema
	
	userSchema.set('collection','users');//指定為colection 名字:users
	
	var User = db.model('User',userSchema); 
	
	var user = new User();
			user.id = userSchema.plugin(autoinc.plugin,{model:'User',field:'id',start:10001,step:1});//autoinc插件 流水號uid++;
			user.fb_id = null;
			user.email =_email;
			user.password = _password;
			user.user_name = _name;
			user.create_date = new Date();
			user.modified_date = new Date();
			user.access_token = null;
			user.profile_pic = null;
			user.mypet_profile = null;
			user.subscribe = null;
		
	//db open
	db.once('open',function(){			
		User.create(user,function(err,User){
			if(err){
				console.log('[error] create');
				console.log(err);
				result(false,null);//callback
				db.close();				
			}else{
				console.log('create done');	
				result(true,User.id);//callback
				
			}							
		});				
	});
	
};


exports.findUserEmail = function(_email,result){
	var db = DbConnect.getConnect();
	
	var userSchema = schema.userSchema();
	
	userSchema.set('collection','users');
	
	var User = db.model('User',userSchema); 
	
	var cond = {email:_email};
	
	db.once('open',function(){
		User.find(cond,function(err,User){ 
			if(err){
				console.log('[error] query');
				console.log(err);
				result(false);
				db.close();
			}else{
				if(User==''){
					console.log('not found');
					result(false);
				}else{
					console.log(User);
					result(true);
				}
			}				
		});			
	});				
};


exports.findUserById = function(_id){
	
	var db = DbConnect.getConnect();

	var userSchema = schema.userSchema();
	userSchema.set('collection','users');
	var User = db.model('User',userSchema); 
	
	var cond = {uid:_id};
	
	db.once('open',function(){
		User.find(cond,function(err,User){ 
			if(err){
				console.log('[error] query');
				console.log(err);
				db.close();
			}else{
				if(User=='')
					console.log('not found');
				else
					console.log(User);					
			}				
		});			
	});			
};


exports.updateUserById = function(_id,field,pastData){
	
	
	var db = DbConnect.getConnect();

	var userSchema = schema.userSchema();
	userSchema.set('collection','users');
	var User = db.model('User',userSchema); 
	
	var cond = {};// query的條件
	cond.uid = _id;
	
	//更新的對象
	var targetString = '{"'+ field +'":'+ pastData +'}'; // json 的 key無法帶入參數 所以先以string形式呈現
	var target = JSON.parse(targetString); //在將string轉成json
	
	
	db.once('open',function(){
		User.find(cond,function(err,result){ 
			if(err){
				console.log('[error] query');
				console.log(err);
				db.close();
			}else{
				if(result=='')
					console.log('not found');
				else{
					User.update(cond,{$set:target},function(err,User){
						if(err){
							console.log('[error] update');
							console.log(err);
							db.close();
						}else{
							console.log('update done');					
						}
					});				

				}

			}				
		});			

	});	
	
};

exports.deleteUserById = function(_id){
	
	var db = DbConnect.getConnect();

	var userSchema = schema.userSchema();
	userSchema.set('collection','users');
	var User = db.model('User',userSchema); 
	
	var cond = {};// query的條件
	cond.uid = _id;
	
	
	db.once('open',function(){
		User.find(cond,function(err,result){ 
			if(err){
				console.log('[error] query');
				console.log(err);
				db.close();
			}else{
				if(result=='')
					console.log('not found');
				else{
					User.remove(cond,function(err,User){
						if(err){
							console.log('[error] remove');
							console.log(err);
							db.close();
						}else{
							console.log('reomve done');
						}
					});
				}
			}				
		});	

	});	
};

