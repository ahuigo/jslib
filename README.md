js lib
=============
For more details. Refer to parse_url.html in my epositories pls.

# Url
## .parseUrl
var url = 'hilo.com/a/b/c?a=1#c1=2&c2=5',
urlInfo = Url.parseUrl(url),

## .addParams
newurl = Url.addParams(url,'var1=test&var2=test2');

## .parseStr
Url.parseStr('a=1&b=2');

# Cookie
	Cookie.set('a', 1);
	Cookie.get('a');

# Ajax
	Ajax.request('/path');

# load

## loadJs
	loadJs('ajax')('cookie')('url');

## loadHmtl
	loadHmtl('<h1>demo</h1>');

