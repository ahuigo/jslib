Array.prototype.chunk = function(chunk=2){
	var i,j,temparray = [];
	for (i=0,j=this.length; i<j; i+=chunk) {
		temparray.push( this.slice(i,i+chunk));
	}
	return temparray
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
