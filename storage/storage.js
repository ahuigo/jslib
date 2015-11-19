kv = {
	set:function(k, v){
		var k1 = k.split('.')[0];
		var k2 = k.split('.')[1];
		var obj = this.get(k1);
		if(k2) {
			obj[k2] = v;
		}else{
			obj = v;
		}
		sessionStorage[k1] = JSON.stringify(obj);
	},
	get:function(k){
		var k1 = k.split('.')[0];
		var k2 = k.split('.')[1];
		var v = sessionStorage[k1];
		var v = v ? JSON.parse(v) : {};
		if(k2){
			v = v[k2]? v[k2] : null;
		}
		return v;
	},
	unset:function(k){
		var k1 = k.split('.')[0];
		var k2 = k.split('.')[1];
		var obj = this.get(k1);
		if(obj[k2]){
			delete obj[k2];
			this.set(k1, obj);
		}
	}
}
