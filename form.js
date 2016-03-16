function InitForm(data){
	$('form').find('input,textarea,select').each(function(){
		var node = $(this);
		var name = node[0].name;
		if(name in data){
			//if(node.prop('type') === 'radio'){
		   if(['radio', 'checkbox'].indexOf(node[0].type ) > -1  ) {
				node.val([data[name]])
			}else{
				node.val(data[name])
			}
		}
	});
}
