function bin2hex(s) {
	var s2 = '', c;
	for (var i = 0, l = s.length; i < l; ++i) {
		c = s.charCodeAt(i);
		s2 += (c >> 4).toString(16);
		s2 += (c & 0xF).toString(16);
	}
	return s2;
}
/**
 * hex2bin('314142');
 */
function hex2bin(hex) {
	var bytes = [], str;

	for(var i=0; i< hex.length-1; i+=2)
	bytes.push(parseInt(hex.substr(i, 2), 16));

	return String.fromCharCode.apply(String, bytes);    
}
