import { EMPTY_OBJECT } from "./shared/utils";

export type TokenPrimitive = string | number;

export type TokenProperty = `--${string}`;

export type TokenVariable = `var(${string})`;

export type TokensStyle = {
  [key: TokenProperty]: TokenPrimitive;
};

export type TokensValue = {
  [key: string]: TokenPrimitive;
};

export type TokensKey<TTokensValue extends TokensValue> = keyof TTokensValue & string;

export type TokensConfig<TTokensValue extends TokensValue> = Partial<TTokensValue>;

export interface Tokens<TTokensValue extends TokensValue> {
  (config: TokensConfig<TTokensValue>): TokensStyle;
  definition: TTokensValue;
  style: TokensStyle;
  css(selector?: string, wrapper?: string): string;
  css(config: TokensConfig<TTokensValue>, selector?: string, wrapper?: string): string;
  value<TKey extends TokensKey<TTokensValue>>(key: TKey): TTokensValue[TKey];
  value<TKey extends TokensKey<TTokensValue>>(
    key: TKey,
    fallback: NonNullable<TTokensValue[TKey]>,
  ): NonNullable<TTokensValue[TKey]>;
  value<TKey extends TokensKey<TTokensValue>>(
    key: TKey,
    fallback?: NonNullable<TTokensValue[TKey]>,
  ): NonNullable<TTokensValue[TKey]> | undefined;
  property<TKey extends TokensKey<TTokensValue>>(key: TKey): TokenProperty;
  variable<TKey extends TokensKey<TTokensValue>>(
    key: TKey,
    fallback?: NonNullable<TTokensValue[TKey]>,
  ): TokenVariable;
  extend(config: TokensConfig<TTokensValue>): Tokens<TTokensValue>;
}

export type InferTokensConfig<TTokens extends Tokens<any>> =
  TTokens extends Tokens<infer TTokenValue> ? TokensConfig<TTokenValue> : never;

export function isTokens(target: unknown): target is Tokens<any> {
  const candidate = target as Tokens<any>;

  return Boolean(
    candidate &&
    candidate.definition &&
    candidate.style &&
    candidate.css &&
    candidate.value &&
    candidate.property &&
    candidate.variable &&
    candidate.extend &&
    typeof candidate === "function" &&
    typeof candidate.definition === "object" &&
    typeof candidate.style === "object" &&
    typeof candidate.css === "function" &&
    typeof candidate.value === "function" &&
    typeof candidate.property === "function" &&
    typeof candidate.variable === "function" &&
    typeof candidate.extend === "function",
  );
}

const ROOT_SELECTOR = ":root";

export interface CreateTokensOptions {
  prefix?: string;
  createVariableName?(key: string, prefix?: string): string;
}

export function createTokens<TTokensValue extends TokensValue>(
  tokens: TTokensValue,
  options: CreateTokensOptions = EMPTY_OBJECT,
): Tokens<TTokensValue> {
  const { prefix, createVariableName = createVariableNameWithDash } = options;

  function value<TKey extends TokensKey<TTokensValue>>(key: TKey): TTokensValue[TKey] | undefined;
  function value<TKey extends TokensKey<TTokensValue>>(
    key: TKey,
    fallback: NonNullable<TTokensValue[TKey]>,
  ): NonNullable<TTokensValue[TKey]>;
  function value<TKey extends TokensKey<TTokensValue>>(
    key: TKey,
    fallback?: NonNullable<TTokensValue[TKey]>,
  ): NonNullable<TTokensValue[TKey]> | undefined;
  function value<TKey extends TokensKey<TTokensValue>>(key: TKey, fallback?: TTokensValue[TKey]) {
    const { [key]: value = fallback } = tokens;

    return value;
  }

  function property<TKey extends TokensKey<TTokensValue>>(key: TKey): TokenProperty {
    return `--${createVariableName(key, prefix)}`;
  }

  function variable<TKey extends TokensKey<TTokensValue>>(
    key: TKey,
    fallback?: NonNullable<TTokensValue[TKey]>,
  ): TokenVariable {
    return fallback === undefined ? `var(${property(key)})` : `var(${property(key)}, ${fallback})`;
  }

  function extend(config: TokensConfig<TTokensValue>): Tokens<TTokensValue> {
    return createTokens<TTokensValue>({ ...tokens, ...config }, options);
  }

  function css(
    maybeConfig?: TokensConfig<TTokensValue> | string,
    maybeSelector?: string,
    maybeWrapper?: string,
  ): string {
    let config: TokensConfig<TTokensValue>;
    let selector: string;
    let wrapper: string | undefined;

    if (typeof maybeConfig === "object") {
      config = maybeConfig;
      selector = maybeSelector || ROOT_SELECTOR;
      wrapper = maybeWrapper;
    } else {
      config = tokens;
      selector = maybeConfig || ROOT_SELECTOR;
      wrapper = maybeSelector;
    }

    const entries = Object.entries(createStyle(config));

    if (entries.length === 0) {
      return "";
    }

    const output: string[] = [];

    if (wrapper) {
      output.push(`${wrapper} {
  ${selector} {`);

      for (const [name, value] of entries) {
        output.push(`    ${name}: ${value};`);
      }

      output.push(`  }
}
`);
    } else {
      output.push(`${selector} {`);

      for (const [name, value] of entries) {
        output.push(`  ${name}: ${value};`);
      }

      output.push(`}
`);
    }

    return output.join("\n");
  }

  function create(config: TokensConfig<TTokensValue>): TokensStyle {
    const style: TokensStyle = {};

    for (const [key, value] of Object.entries(config)) {
      if (value !== undefined) {
        style[property(key)] = value;
      }
    }

    return style;
  }

  let _style: TokensStyle;

  function createStyle(config: TokensConfig<TTokensValue>): TokensStyle {
    if (config !== tokens) {
      return create(config);
    }

    if (!_style) {
      _style = create(config);
    }

    return _style;
  }

  createStyle.definition = tokens;

  createStyle.value = value;

  createStyle.property = property;

  createStyle.variable = variable;

  createStyle.extend = extend;

  createStyle.css = css;

  Object.defineProperty(createStyle, "style", {
    get() {
      return createStyle(tokens);
    },
  });

  return createStyle as Tokens<TTokensValue>;
}

function createVariableNameWithDash(key: string, prefix?: string) {
  if (key.includes(".")) {
    const path = key.split(".");

    if (prefix) {
      path.unshift(prefix);
    }

    return path.join("-");
  }

  if (prefix) {
    return `${prefix}-${key}`;
  }

  return key;
}
