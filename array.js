Array.prototype.chunk = function(chunk=2){
	var i,j,temparray = [];
	for (i=0,j=this.length; i<j; i+=chunk) {
		temparray.push( this.slice(i,i+chunk));
	}
	return temparray
}
