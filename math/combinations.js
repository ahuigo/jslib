// r*(r-1)*...*2*1
function factorial(r) {
    let s = BigInt(1);
    var i = BigInt(r)
    while (i > 1) s *= i--;
    return s;
}

// n*(n-1)*....*(n-r+1) / factorial(r)
function combinations(n, r){
    let s = BigInt(1);
    let i = BigInt(r);
    while(i<n) s*=++i;
    return s/factorial(n-r)
}


// https://www.wolframalpha.com/input?i=100+choose+2 tells us it's true result is `4950`.
console.log(combinations(100,2) === 4950n) // true
