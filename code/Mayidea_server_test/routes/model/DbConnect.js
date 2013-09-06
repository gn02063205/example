/**
 * New node file
 */

var mongoose = require('mongoose');

exports.getConnect = function()
{

	var opts = {server:{auto_reconnect:true}, db:{safe:true}}; //設定,例如password

	var db = mongoose.createConnection('localhost','server',27017,opts);

	db.on('error',console.error.bind(console, 'Connection error:'));// if error, return
	
	
	return db;	// 回傳連線物件
	
};