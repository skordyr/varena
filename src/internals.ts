export const EMPTY_OBJECT = {};

export function run<T>(fn: () => T) {
  return fn();
}

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
