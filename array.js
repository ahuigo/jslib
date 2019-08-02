Array.prototype.chunk = function(chunk=2){
	var i,j,temparray = [];
	for (i=0,j=array.length; i<j; i+=chunk) {
		temparray.push( array.slice(i,i+chunk));
	}
	return temparray
}
