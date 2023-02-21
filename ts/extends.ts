type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
};
type TP = MyPick<{ a: string, b: number, c: boolean; }, 'a' | 'b'>;

// without extends for no T
const o = { a: 1, b: 1, c: 1 };
type O = typeof o;
type d = {
  [P in keyof typeof o]: O[P]
};

type M = {
  a: string, b: number, c: boolean;
}['a' | 'b']; //string|number


export type ReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T];


type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;

type IfEquals2<X, Y, A = X, B = never> =
  (<T>() => (T extends X ? 1 : 2)) extends
  (<T>() => (T extends Y ? 1 : 2)) ? A : B;
type c = IfEquals2<{ a: string; }, { readonly a: string; }, 3, 4>;
// type c2 = IfEquals<string, readonly string, 3, 4>;

type Props = { readonly foo: string; bar: number; };

// Expect: "foo"
export type ReadonlyKeys2<T extends object> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
};
export type ReadonlyKeys3<T extends object> = {
  [P in keyof T]: { [Q in P]: T[P] }
};
type Keys = ReadonlyKeys3<Props>;


type c3 = [2] & [0, 1, 8] extends [2] & [0, 1, 8] & [0, infer W] ? W : 'no';
type c4 = [2] & [2, 1, 8];

type c5<T> = () => T extends string ? 1 : 2;
type c6 = c5<string>;

export type Equals<T, S> =
  T extends S ? (
    S extends T ? true : false
  ) : false
  ;
type c7 = Equals<1, 1>;
type c8 = Equals<{ x: boolean; }, { x: number; }>;//true

type BeLong<T> = string extends T ? { x: 1, y: 1; } : { y: 1, z: 1; };
type d1 = BeLong<string>;
type d2 = BeLong<number>;
type d3 = BeLong<string | number>;