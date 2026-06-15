export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export type SimplifyShallow<T> = Simplify<{
  [K in keyof T]: T[K] extends object ? Simplify<T[K]> : T[K];
}>;

export type PartialShallow<T> = Partial<{
  [K in keyof T]: T[K] extends object ? Partial<T[K]> : T[K];
}>;
