/**
 * str_pad
 */
String.prototype.str_pad = function(len){
	//var ans = ('0000'+str).substring(str.length);
	var ans = Array(len-this.length+1).join('0')+this
	return ans;
}

/**
 * getNthColumnIndex
 */
String.prototype.getNthColumnIndex= function(m, n) {
       return this.split(m, n).join(m).length + m.length;
}
String.prototype.nthIndex = function(pat, n){
    var L= this.length, i= -1;
    while(n-- && i++<L){
        i= this.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}
