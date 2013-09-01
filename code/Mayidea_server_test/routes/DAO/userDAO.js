
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
	var createModel = new User({
			fb_id:null,
			email:_email,
			password:_password,
			user_name:_name,
			create_date:new Date(),
			modified_date:new Date(),
			access_token:null	
		});

	//db open
	db.once('open',function(){		
		userSchema.plugin(autoinc.plugin,{model:'User',field:'uid',start:10001,step:1});//autoinc插件 流水號uid++
		User.create(createModel,function(err,User){
			if(err){
				console.log('[error] create');
				console.log(err);
				result(false);//callback
				db.close();				
			}else{
				console.log('create done');	
				result(true);//callback
				
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

