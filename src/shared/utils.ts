export const EMPTY_OBJECT = {} as const;

export function run<T>(fn: () => T): T {
  return fn();
}
