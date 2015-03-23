/**
 *
 */
(Url = function (){
	//var self = Url.prototype;
	var self = Url;
	/**
	 * @params url	eg: 'http://username:password@hilo.com/a/b/c?a=1#c1=2&c2=5';
	 *				'hilo.com/b/c?a=1#c1=2&c2=5';
	 *				'/a/b/c?a=1#c1=2&c2=5';
	 */
	self.parseUrl = function (url){
		//console.log(url);
		var pos,str, urlInfo = {
			'scheme':'',
			'user':'',
			'pass':'',
			'path':'',
			'query':'',
			'fragment':''
		};
		//anchor
		pos = url.indexOf('#');
		if(pos>-1){
			urlInfo['fragment'] = url.substr(pos+1);
			url = url.substr(0,pos);
		}

		//scheme
		pos = url.indexOf('://');
		if(pos>-1){
			urlInfo['scheme'] = url.substr(0,pos);
			url = url.substr(pos+3); 
		}

		//host & user & pass
		host_pos = url.indexOf('/');
		if(host_pos>-1){
			host_str = url.substr(0,host_pos);
		}else{
			host_str = url;
		}
		if((at_pos = host_str.indexOf('@'))>-1){
			urlInfo['host'] = host_str.substr(at_pos+1);
			str = host_str.substr(0,at_pos).split(':');
			urlInfo['user'] = str[0];
			urlInfo['pass'] = str[1] ? str[1] :'';
		}else{
			urlInfo['host'] = host_str;
		}
		if(-1 == host_pos){
			return urlInfo;
		}
		url = url.substr(host_pos);

		//path
		pos = url.indexOf('?')
		if(pos>-1){
			urlInfo['path'] = url.substr(0,pos);
			urlInfo['query'] = url.substr(pos+1);
		}else{
			urlInfo['path'] = url;
		}
		return urlInfo;
	}

	/**
	 * addParams
	 */
	self.addParams = function(oriUrl, params){
		var url,query;

		//get urlInfo
		var urlInfo = self.parseUrl(oriUrl);
		//console.log(urlInfo);

		//get query
		query = urlInfo['query'];

		//set params
		if(query && params[0]!=='&' && '&' !== query.substr(-1,1)){
			params = '&'+params;	
		}

		//return url
		url = '';
		if(urlInfo['scheme']){
			url += urlInfo['scheme'] + '://';
		}
		url += urlInfo['host'] + urlInfo['path']+'?'+urlInfo['query']+params+'#'+urlInfo['fragment'];
		return url;
	}
	/**
	 * parseStr('a=1&b=2')
	 */
	self.parseStr = function (query){
		var queryArr = query.replace(/^&/, '') .replace(/&$/, '').split('&');
		var arr = {};
		for(var i in queryArr){
			if(queryArr[i]){
				var k = queryArr[i].split('=')[0];
				var v = queryArr[i].split('=')[1] || '';
				arr[k] = decodeURIComponent(v);
			}
		}
		return arr;
	}
})()
