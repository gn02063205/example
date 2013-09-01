
var userDAO = require('../DAO/userDAO.js');
var express = require('express');
var app = express();
app.use(express.bodyParser());

exports.UserRegister = function(req,res){ // user register function
	
	//request parameter
	var _email = req.body.email;
	var _password = req.body.password;
	var _name = req.body.name;
	
	userDAO.createUser(_email,_password,_name,function(result){ // use creste DAO
		if(result)
			res.send('register success! hello !' + _name);
		else
			res.send('register fail');
	});
	
};