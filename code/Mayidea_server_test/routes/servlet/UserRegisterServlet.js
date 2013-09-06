
var express = require('express');

var app = express();

app.use(express.bodyParser());

var userDAO = require('../DAO/userDAO.js');

exports.UserRegister = function(req,res){ // user register function

	//request parameter
//	var _email = req.body.email;
//	var _password = req.body.password;
//	var _name = req.body.name;

	var _email = req.query.email;
	var _password = req.query.password;
	var _name = req.query.name;

	console.log('servlet '+_name,_password,_email);

	if(_email && _password && _name){ // 判斷參數是否收到
		userDAO.findUserEmail(_email,function(result){//判斷email是否重複
			if(result){
				res.send('email already exist');	
			}else{
				userDAO.createUser(_email,_password,_name,function(result,id){ // use creste DAO
					if(result){
						res.send('register successed! hello! ' + _name+'<p>'+'your id is '+id);
					}else
						res.send('register fail');
				});
			}
		});
	
	}else{
		console.log('wrong parameter');
		res.send('register failed');

	}

};