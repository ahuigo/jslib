/**
 * Refer to https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
/**
 * Ajax.request('url','get', '', '', false);
 */
(Ajax=function(){
	//var self = Ajax.prototype;
	var self = Ajax;
	var xhr = self.xhr = new XMLHttpRequest();//self.xhr is static variable
	self.request = function(url, method, data, func, async){
		if(async === undefined) async = true; //default to be true
		if(async === undefined) method = 'get';
		var urlObj = new Url;

		if(method === 'get' && data){ url = Url.addParams(url, data)}
		xhr.open(method, url, async);

		if(method === 'post'){
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//post
		}

		if(func && async){
			/*xhr.onreadystatechange= function() {
				if (xhr.readyState==4 && xhr.status==200) {
					func(xhr.responseText);
				}
			}*/
			xhr.onload = function() {
				func(xhr.responseText);
			}
		}
		xhr.send(data);//data: urlencoded / FormData data/ 
		if(!async){
			return xhr.responseText;
		}
	}
})();
