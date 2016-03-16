/**
 * Created by hilojack on 7/12/15.
 * Url.parseUrl();
 * @params url	eg: 'http://username:password@hilo.com/a/b/c?a=1#c1=2&c2=5';
 *				'hilo.com/b/c?a=1#c1=2&c2=5';
 *				'/a/b/c?a=1#c1=2&c2=5';
 */
String.prototype.parseUrl = function(){
    var url=this;
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
    var host_pos;
    if( (host_pos = url.indexOf('/')) > -1
        || (host_pos = url.indexOf('?')) > -1
        || (host_pos = url.indexOf('#')) > -1
    ){
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
String.prototype.addParams = function(param){
    var url,query;

    //get urlInfo
    var urlInfo = this.parseUrl();
    //console.log(urlInfo);

    //get query
    query = urlInfo['query'];
   var params = query.parseStr();

    if(typeof param === 'string'){
        param = param.parseStr();
    }

    for(var i in param){
        params[i] = param[i];
    }
    var query = http_build_query(params);

    //return url
    url = '';
    if(urlInfo['scheme']){
        url += urlInfo['scheme'] + '://';
    }
    url += urlInfo['host'] + urlInfo['path']+'?'+query;
    if(urlInfo['fragment']){
        url += '#'+urlInfo['fragment'];
    }
    return url;
}

/**
 *
 * @param obj
 * @param num_prefix
 * @param temp_key
 * @returns {string}
 */
http_build_query = function (obj, num_prefix, temp_key) {
    var output_string = []

    Object.keys(obj).forEach(function (val) {

        var key = val;

        num_prefix && !isNaN(key) ? key = num_prefix + key : ''

        var key = encodeURIComponent(key.replace(/[!'()*]/g, escape));
        temp_key ? key = temp_key + '[' + key + ']' : ''

        if (typeof obj[val] === 'object') {
            var query = build_query(obj[val], null, key)
            output_string.push(query)
        } else if(typeof obj[val] === 'string'){
            var value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape));
            output_string.push(key + '=' + value)
        }

    })

    return output_string.join('&')

}
/**
 * parseStr('a=1&b=2')
 */
String.prototype.parseStr = function (key){
    var queryArr = this.replace(/^[&?]/, '') .replace(/&$/, '').split('&');
    var arr = {};
    for(var i in queryArr){
        if(queryArr[i]){
            var k = queryArr[i].split('=')[0];
            var v = queryArr[i].split('=')[1] || '';
            arr[k] = decodeURIComponent(v.replace(/\+/g, '%20'));
        }
    }
    if(key){
       return arr[key]?arr[key]:'';
    }
    return arr;
}
String.prototype.encodeEntities = function (){
    var textArea = document.createElement('p');
    textArea.innerText = this;
    return textArea.innerHTML;
}

function Pager(pager, currentPage, maxPage){
    var search = '?'+ location.search.substr(1);
    var matches;
    if (matches = search.match(/[&?](page=\d+)/)) {
        search = search.replace(matches[1], '');
    }
    var start = currentPage - ((currentPage-1)%10);
    var end = start+10 > maxPage ? maxPage : start+10;
    start = start-1 > 0? start -1: 1;

    var ol = $('<ol class="pagination"></ol>');
    if(start>1){
        ol.append($('<li><a href="'+search +'&page='+(1)+'">'+(1)+'</a></li>'));
    }
    for(var i=start; i<=end; i++){
        if(i===currentPage){
            ol.append($('<li><a href="#">'+i+'</a></li>'));
        }else{
            ol.append($('<li><a href="'+search +'&page='+i+'">'+i+'</a></li>'));
        }
    }
    if(end<maxPage){
        ol.append($('<li><a href="'+search +'&page='+maxPage+'">'+maxPage+'</a></li>'));
    }
    pager.html('').append(ol);
}
