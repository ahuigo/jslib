/*hilo.js*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "Y": ('0' + (this.getFullYear())).substr(-4), //月份 
        "m": ('0' + (this.getMonth() + 1)).substr(-2), //月份 
        "d": ('0' +this.getDate()) .substr(-2), //日 
        "H": ('0' + this.getHours()).substr(-2), //小时 
        "i": ('0'+this.getMinutes()).substr(-2), //分 
        "s": ('0'+this.getSeconds()).substr(-2), //秒 
        "q": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.add= function(seconds){
	this.setTime(this.getTime() + (seconds * 1000))
	return this;
}
