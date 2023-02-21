// 1. KyeofType
// https://github.com/microsoft/TypeScript/issues/23724
type KeyTypes<T> = {
  [K in keyof T]-?: K extends string ?
  string :
  K extends number ?
  number :
  K extends symbol ?
  symbol :
  never
}[keyof T];

type KeyOfType<T, KeyType extends string | number | symbol = KeyTypes<T>> = Extract<keyof T, KeyType>;


// keyof T is union type: 'x'| 'y' ...
// is type: check type
function isKey<E>(str: string): str is Extract<keyof E, string> {
  return true;
}
function isKey2<E>(str: string | number | symbol): str is keyof E {
  return true;
}
isKey<{ x: 1; }>('ab');
isKey2<{ x: 1; }>('ab');