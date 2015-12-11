/**
 * Require Jquery
 */
String.prototype.encodeHtmlEntities = function(){
	    return this.replace(/[\u00A0-\u00FF<>\&]/gim, function(k){
		   return '&#'+k.charCodeAt(0)+';';
		}) ;
}
function Table(data, insertNode){
	this.data = data;
	this.insertNode = insertNode;
	if (Table._initialized === undefined) {
		var self = Table;
		self._initialized = true;
		self.prototype.createTable = function(dataList, titles, insertNode) {
			var table='';
			table += '<tr>';
			$.each(titles, function(k, title){
				table +=  '<th>' + + '</th>';
			});
			table += '</tr>';

			$('<tr>' +
					'<th>id</th>' +
					'<th>status</th>' +
					'<th>uid</th>' +
					'<th>phone</th>' +
					'<th>渠道</th>' +
					'<th>txt</th>' +
					'<th>url</th>' +
					'<th>app_title</th>' +
					'<th>app_image_url</th>' +
					'<th>app_content</th>' +
					'<th>expire_time</th>' +
					'</tr>');.appendTo('#list');
			$.each(data['list'], function(i, item) {
				var $tr = $('<tr id="'+item.id+'">').append(
						$('<td>').text(item.id),
						$('<td>').text(item.status),
						$('<td>').text(item.uid),
						$('<td>').text(item.phone),
						$('<td>').text(channelName),
						$('<td>').text(item.txt),
						$('<td>').text(item.url),
						$('<td>').text(item.app_title),
						$('<td>').html('<img width="150px" src="'+item.app_image_url+'">'),
						$('<td>').text(item.app_content),
						$('<td>').text(
								(new Date(item.expire_time * 1000)).toLocaleString()
						)
				);
				$tr.appendTo('#list');
			});
			pager(page, data['maxPage']);
			setProgress(data['task']);
		};
	}
  }
}
	}).fail(function (xhr) {
		$('#info').text(xhr.statuseText);

	});
}
