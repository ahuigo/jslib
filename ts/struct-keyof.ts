/*
partial key
*/
let o = { x: "hi", extra: 1 }; // ok
let o2: { x: string; } = o; // ok

// keyof type(it is unit type)
type OKEY = keyof typeof o;
type Obj = {
  // type K = keyof typeof o // unions: "x"|"extra"
  [x in keyof typeof o]: boolean
};

// keyof T (keyof T is now string | number | symbol) 
// type MyPick<T, K = keyof T> = { //K is not assignable to type 'string | number | symbol' 
type MyPick<T, K extends keyof T> = { // extends: convert unit type to string | number | symbol
  [P in K]: number
};

