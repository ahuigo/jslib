/**
 * 永远不要使用for...in array: 它很慢，也不保证元素顺序，还会遍历继承的元素
 */
Array.prototype.chunk = function (chunk = 2) {
    var i, j, temparray = [];
    for (i = 0, j = this.length; i < j; i += chunk) {
        temparray.push(this.slice(i, i + chunk));
    }
    return temparray
}

Array.prototype.unique = function () {
    return [...new Set(this)];
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

