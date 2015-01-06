loadJs.root = '/js';
function loadJs(name, callback) {
	//var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = (loadJs.root+'/'+name.toLowerCase()+'.js') . replace('//', '/');

	if(callback)
		script.addEventListener('load', callback, false);

	// Fire the loading
	document.head.appendChild(script);
	return loadJs;
}
function loadHtml(html){
	/*var div = document.createElement('div');
	div.innerHTML = html;
	document.body.appendChild(div.children[0]);
	*/
	document.body.innerHTML += html;
}
