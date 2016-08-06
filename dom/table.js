/**
 * Require Jquery
 */
String.prototype.encodeHtmlEntities = function(){
	    return this.replace(/[\u00A0-\u00FF<>\&]/gim, function(k){
		   return '&#'+k.charCodeAt(0)+';';
		}) ;
}
    function getList(page) {
        var api = '/huajiao/badcdn/getBadCase?' + http_build_query(filterParams);
        $.ajax(api + '&page=' + page).done(function (data) {
            if (data['errno'] === 0) {
                $('<tr>' +
                    '<th>id</th>' +
                    '<th>SN</th>' +
                    '<th>错误类型</th>' +
                    '<th>CDN</th>' +
                    '<th>主播IP</th>' +
                    '<th>时间</th>' +
                    '</tr>').appendTo('#table');
                $.each(data['list'], function (i, item) {
                    var $tr = $('<tr id="' + item.id + '">').append(
                        $('<td>').text(item.id),
                        $('<td>').append($('<a></a>').text(item.sn).attr('href','/huajiao/livestream/detail?sn='+item.sn)),
                        $('<td>').text(item.badType),
                        $('<td>').text(item.deployaddress),
                        $('<td>').text(item.inaddress),
                        $('<td>').text(item.date)
                    );
                    $tr.appendTo('#table');
                });
                Pager($('#pager'), page, data['maxPage']);
            } else {
                console.log(data);
                alerts(data['error']);
            }
        });
    }
