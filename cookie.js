/**
 *
 * Example: 
 * 	Cookie.set('key', 'value');//setCookie
 */
Cookie();
function Cookie(){
	if(Cookie.init === undefined){
		Cookie.init = 1;
		//var self = Cookie.prototype;
		var self = Cookie;
		self.set = function(k, v, time){
			if(time === undefined){
				document.cookie=k + "= " + v  + "; path=/";
			}else{
				var d = new Date();
				d.setSeconds(d.getSeconds() + time);
				document.cookie=k + "= " + v  + "; path=/; expires=" + d.toString();
			}
		}
		self.get = function(k){
			var value = "; " + document.cookie;
		    var parts = value.split("; " + k+ "=");
			if (parts.length == 2) 
				return parts.pop().split(";")[0];
		}
	}
}
