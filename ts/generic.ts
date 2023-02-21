type NameOrId<T extends number | string> = T extends number ? 'number' : 'string';
type X = NameOrId<1>; // 'number'
type Y = NameOrId<number>; // 'number'
// type Y2 = NameOrId<false> // not ok