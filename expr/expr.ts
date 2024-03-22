type A = {
    f?:()=>void;
}

function testCallOptionalFunc(a: A){
    a.f?.()
}
