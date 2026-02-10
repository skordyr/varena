import { EMPTY_OBJECT } from "./internals";

export type TokenPrimitive = string | number;

export type TokenProperty = `--${string}`;

export type TokenVariable = `var(${string})`;

export type TokensStyle = {
  [name: TokenProperty]: TokenPrimitive;
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

export function isTokensType(target: any): target is Tokens<any> {
  const candidate = target as Tokens<any>;

  return Boolean(
    candidate &&
    typeof candidate === "function" &&
    candidate.definition &&
    typeof candidate.definition === "object" &&
    candidate.style &&
    typeof candidate.style === "object" &&
    candidate.value &&
    typeof candidate.value === "function" &&
    candidate.property &&
    typeof candidate.property === "function" &&
    candidate.variable &&
    typeof candidate.variable === "function" &&
    candidate.extend &&
    typeof candidate.extend === "function",
  );
}

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
    const propertyName = property(key);

    return fallback === undefined ? `var(${propertyName})` : `var(${propertyName}, ${fallback})`;
  }

  function extend(config: TokensConfig<TTokensValue>): Tokens<TTokensValue> {
    return createTokens<TTokensValue>({ ...tokens, ...config }, options);
  }

  let _style: TokensStyle;

  function createStyle(config: TokensConfig<TTokensValue>): TokensStyle {
    function create() {
      const style: TokensStyle = {};

      for (const [key, value] of Object.entries(config)) {
        if (value !== undefined) {
          const propertyName = property(key);

          style[propertyName] = value;
        }
      }

      return style;
    }

    if (config !== tokens) {
      return create();
    }

    if (!_style) {
      _style = create();
    }

    return _style;
  }

  createStyle.definition = tokens;

  createStyle.value = value;

  createStyle.property = property;

  createStyle.variable = variable;

  createStyle.extend = extend;

  Object.defineProperty(createStyle, "style", {
    get() {
      return createStyle(tokens);
    },
  });

  return createStyle as Tokens<TTokensValue>;
}

function createVariableNameWithDash(key: string, prefix?: string) {
  const path = key.split(".");

  if (prefix) {
    path.unshift(prefix);
  }

  return path.join("-");
}
