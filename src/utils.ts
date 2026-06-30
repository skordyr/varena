export function cx<TClasses extends [string, ...(string | undefined)[]]>(
  ...classes: TClasses
): string;
export function cx<TClasses extends (string | undefined)[]>(
  ...classes: TClasses
): string | undefined;
export function cx(): string | undefined {
  const length = arguments.length;

  if (length <= 1) {
    return arguments[0];
  }

  if (length === 2) {
    if (arguments[0] && arguments[1]) {
      return arguments[0] + " " + arguments[1];
    }

    return arguments[1] || arguments[0];
  }

  let merged;

  for (let index = 0; index < length; index++) {
    const className = arguments[index];

    if (className) {
      merged = merged ? merged + " " + className : className;
    }
  }

  return merged || arguments[0];
}

export function sx<TStyles extends [object, ...(object | undefined)[]]>(
  ...styles: TStyles
): TStyles[number];
export function sx<TStyles extends (object | undefined)[]>(
  ...styles: TStyles
): TStyles[number] | undefined;
export function sx(): object | undefined {
  const length = arguments.length;

  if (length <= 1) {
    return arguments[0];
  }

  if (length === 2) {
    if (arguments[0] && arguments[1]) {
      return {
        ...arguments[0],
        ...arguments[1],
      };
    }

    return arguments[1] || arguments[0];
  }

  let base;
  let merged;

  for (let index = 0; index < length; index++) {
    const style = arguments[index];

    if (style) {
      if (!base) {
        base = style;
      } else if (!merged) {
        merged = {
          ...base,
          ...style,
        };
      } else {
        Object.assign(merged, style);
      }
    }
  }

  return merged || base;
}
