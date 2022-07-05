function bytes2str(bytes:Uint8Array){
    return new TextDecoder().decode(bytes)
}

function str2bytes(s){
    return new TextEncoder().encode(s)
}
console.log(bytes2str(new Uint8Array([0x31,0x32]))) //12
console.log(str2bytes('12')) //Uint8Array([49,50])
