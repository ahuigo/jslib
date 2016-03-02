Date.prototype.format = function(){
	var d = this;
	return d.getFullYear()+'-' + (d.getMonth()+1)+'-' + d.getDate()+' ' + d.getHours()+':' + d.getMinutes()+':' + d.getSeconds()+''
}
Date.prototype.add= function(seconds){
	this.setTime(this.getTime() + (seconds * 1000))
	return this;
}
