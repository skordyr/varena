export function cx<TClasses extends [string, ...(string | undefined)[]]>(
  ...classes: TClasses
): string;
export function cx<TClasses extends (string | undefined)[]>(
  ...classes: TClasses
): string | undefined;
export function cx<TClasses extends (string | undefined)[]>(
  ...classes: TClasses
): string | undefined {
  if (classes.length <= 1) {
    return classes[0];
  }

  if (classes.length === 2) {
    if (classes[0] && classes[1]) {
      return `${classes[0]} ${classes[1]}`;
    }

    return classes[0] || classes[1];
  }

  const merged = [];

  for (const className of classes) {
    if (className) {
      merged.push(className);
    }
  }

  if (merged.length <= 1) {
    return merged[0];
  }

  return merged.join(" ");
}

export function sx<TStyles extends [object, ...(object | undefined)[]]>(
  ...styles: TStyles
): TStyles[number];
export function sx<TStyles extends (object | undefined)[]>(
  ...styles: TStyles
): TStyles[number] | undefined;
export function sx<TStyles extends (object | undefined)[]>(
  ...styles: TStyles
): TStyles[number] | undefined {
  if (styles.length <= 1) {
    return styles[0];
  }

  if (styles.length === 2) {
    if (styles[0] && styles[1]) {
      return {
        ...styles[0],
        ...styles[1],
      };
    }

    return styles[0] || styles[1];
  }

  let base;
  let merged;

  for (const style of styles) {
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
