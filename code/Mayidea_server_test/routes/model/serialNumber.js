/**
 * New node file
 */


exports.getNumber = function(){
	
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth()+1;//0~11
	var date = today.getDate();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	
	if(month<10)
		month = '0'+month;
	if(date<10)
		date = '0'+date;
	if(hours<10)
		hours = '0'+hours;
	if(minutes<10)
		minutes = '0'+minutes;
	if(seconds<10)
		seconds = '0'+seconds;
	
	var random = Math.round(Math.random()*900+100);//round 四捨五入
	
	
	var serial_number;
	
	serial_number = ''+year+''+month+''+date+''+hours+''+minutes+''+seconds+''+random+'';
	
	
	return serial_number;
		
};

