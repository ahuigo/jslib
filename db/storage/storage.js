kv = {
	set:function(k, v){
        const k1 = k.split('.')[0];
        const k2 = k.split('.')[1];
        let obj = this.get(k1);
		if(k2) {
			obj[k2] = v;
		}else{
			obj = v;
		}
		sessionStorage[k1] = JSON.stringify(obj);
	},
	get:function(k){
        const k1 = k.split('.')[0];
        const k2 = k.split('.')[1];
        let v = sessionStorage[k1];
        v = v ? JSON.parse(v) : {};
		if(k2){
			v = v[k2]? v[k2] : null;
		}
		return v;
	},
	unset:function(k){
        const k1 = k.split('.')[0];
        const k2 = k.split('.')[1];
        const obj = this.get(k1);
		if(obj[k2]){
			delete obj[k2];
			this.set(k1, obj);
		}
	}
}
