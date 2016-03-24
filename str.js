/**
 * str_pad
 */
String.prototype.str_pad = function(len){
	//var ans = ('0000'+str).substring(str.length);
	var ans = Array(len-this.length+1).join('0')+this
	return ans;
}
