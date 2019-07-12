Date.prototype.unitWeight = {
    MS:1,
    S:1000,
    M:60000,
    H:3600000,
    d:86400*1000,
    m:30*86400*1000,
    Q:4*30*86400*1000,
    Y:365*86400*1000,
}
Date.prototype.add = function(n, unit='S'){
    let weight = this.unitWeight[unit]
    this.setTime(this.getTime() + (n* weight));
    return this;
}
Date.prototype.diff = function(d, unit='S'){
    let weight = this.unitWeight[unit]
    return (this.getTime() - d.getTime())/weight;
}


//(new Date()).format()
Date.prototype.format = function(format){
    let d = this;
    let pairs = {
        '%Y': d.getFullYear(),
        '%m': (d.getMonth()+1+'').padStart(2, '0'),
        '%d': ('0'+d.getDate()).slice(-2),
        '%H': d.getHours(),
        '%I': d.getMinutes(),
        '%S': d.getSeconds(),
        '%s': d.getTime() / 1000 | 0,//unixTimestamp
    }
    if(!format){
        format = '%Y-%m-%d %H:%I:%S';
    }
    return format.replace(/%\w/g, (key)=>{
        return pairs[key]?pairs[key]:key
    })
}

//Date.parseTime('2017-10-31')
Date.parseTime = function (str, format='%Y-%m-%d') {
    let index=0;
    let d = new Date()
    for(let s of format.match(/%\w|./g)){
        switch(s){
            case '%Y': d.setYear(str.slice(index,index+4)); index+=4; break;
            case '%m': d.setMonth(str.slice(index,index+2)-1); index+=2; break;
            case '%d': d.setDate(str.slice(index,index+2)); index+=2; break;
            case '%H': d.setHours(str.slice(index,index+2)); index+=2; break;
            case '%I': d.setMinutes(str.slice(index,index+2)); index+=2; break;
            case '%S': d.setSeconds(str.slice(index,index+2)); index+=2; break;
            default: index+=1
        }
    }
    return d
}
