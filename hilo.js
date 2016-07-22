var _hiloTip = ' <style> #Tip{ position: absolute; left: 50%;top: 50%;z-index: 9999; width: 200px;height: 100px; margin-top: -50px;margin-left: -100px; } @keyframes hidden { 100%   { opacity: 0.5;top:0} } .Tip{ animation: hidden 10s forwards; } </style> <div id="Tip" class="alert alert-danger hidden"></div> ';
function alerts(msg){
    console.log(msg);
    var node = $('#Tip');
    if(node.length == 0){
        node = $(_hiloTip);
        $('body').append(node);
    }
    $('#Tip').text(msg).removeClass('hidden').addClass('Tip');
    setTimeout(function(){
        node.removeClass('Tip').addClass('hidden');
    }, 9000);
}


/**
 * init function
 * @param myObject
 * @returns {Array}
 */
function array_keys(myObject) {
    output = [];
    for(var key in myObject) {
        output.push(key);
    }
    return output;
}
function array_values(myObject) {
    output = [];
    for(var key in myObject) {
        output.push(myObject[key]);
    }
    return output;
}

/*date.js*/
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "Y": ('0' + (this.getFullYear())).substr(-4), //月份 
        "m": ('0' + (this.getMonth() + 1)).substr(-2), //月份 
        "d": ('0' +this.getDate()) .substr(-2), //日 
        "H": ('0' + this.getHours()).substr(-2), //小时 
        "i": ('0'+this.getMinutes()).substr(-2), //分 
        "s": ('0'+this.getSeconds()).substr(-2), //秒 
        "q": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
