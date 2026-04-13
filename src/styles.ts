import type { Simplify } from "./shared/types";

import { EMPTY_OBJECT, run } from "./shared/utils";

export type SlotsValue = {
  [name: string]: string;
};

export type Slots<TSlotsValue extends SlotsValue> = {
  [name in keyof TSlotsValue]: string;
};

export type VariantPrimitive = string | number;

export type VariantValue<TVariantValue extends VariantPrimitive> = TVariantValue extends
  | "true"
  | "false"
  ? boolean
  : TVariantValue;

export type VariantsValue<TSlotsValue extends SlotsValue> = {
  [name: string]: {
    [value: VariantPrimitive]: Partial<Slots<TSlotsValue>>;
  };
};

export type Variants<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> = {
  [TName in keyof TVariantsValue]: VariantValue<keyof TVariantsValue[TName] & VariantPrimitive>;
};

export type CompoundVariantVariantsValue<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> = {
  [TName in keyof TVariantsValue]?:
    | VariantValue<keyof TVariantsValue[TName] & VariantPrimitive>
    | VariantValue<keyof TVariantsValue[TName] & VariantPrimitive>[];
};

export interface CompoundVariant<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> {
  variants: CompoundVariantVariantsValue<TSlotsValue, TVariantsValue>;
  slots: Partial<Slots<TSlotsValue>>;
}

export type CompoundVariants<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> = CompoundVariant<TSlotsValue, TVariantsValue> | CompoundVariant<TSlotsValue, TVariantsValue>[];

export interface StylesValue<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> {
  slots: TSlotsValue;
  variants?: TVariantsValue;
  compoundVariants?: CompoundVariants<TSlotsValue, TVariantsValue>;
  defaultVariants?: Partial<Variants<TSlotsValue, TVariantsValue>>;
}

export interface StylesConfig<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> {
  slots?:
    | ((
        variants: Partial<Variants<TSlotsValue, TVariantsValue>>,
      ) => Partial<Slots<TSlotsValue>> | undefined)
    | Partial<Slots<TSlotsValue>>;
  variants?: Partial<Variants<TSlotsValue, TVariantsValue>>;
}

export interface Styles<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
> {
  (
    config?: StylesConfig<TSlotsValue, TVariantsValue>,
    overrides?: Partial<Slots<TSlotsValue>> | string,
  ): Slots<TSlotsValue>;
  definition: StylesValue<TSlotsValue, TVariantsValue>;
  slots: Slots<TSlotsValue>;
}

export type InferStylesConfig<TStyles extends Styles<any, any>> =
  TStyles extends Styles<infer TSlotsValue, infer TVariantsValue>
    ? StylesConfig<TSlotsValue, VariantsValue<any> extends TVariantsValue ? {} : TVariantsValue>
    : never;

export type ExtractStylesConfig<TStyles extends Styles<any, any>, TRules extends string> =
  TStyles extends Styles<infer TSlotsValue, infer TVariantsValue>
    ? StylesConfig<
        Simplify<Pick<TSlotsValue, Extract<keyof TSlotsValue, TRules>>>,
        VariantsValue<any> extends TVariantsValue ? {} : TVariantsValue
      >
    : never;

export type ExcludeStylesConfig<TStyles extends Styles<any, any>, TRules extends string> =
  TStyles extends Styles<infer TSlotsValue, infer TVariantsValue>
    ? StylesConfig<
        Simplify<Pick<TSlotsValue, Exclude<keyof TSlotsValue, TRules>>>,
        VariantsValue<any> extends TVariantsValue ? {} : TVariantsValue
      >
    : never;

export type InferComponentStylesConfig<TStyles extends Styles<any, any>> = Simplify<
  Pick<InferStylesConfig<TStyles>, "slots"> & InferStylesConfig<TStyles>["variants"]
>;

export type ExtractComponentStylesConfig<
  TStyles extends Styles<any, any>,
  TRules extends string,
> = Simplify<
  Pick<ExtractStylesConfig<TStyles, TRules>, "slots"> & InferStylesConfig<TStyles>["variants"]
>;

export type ExcludeComponentStylesConfig<
  TStyles extends Styles<any, any>,
  TRules extends string,
> = Simplify<
  Pick<ExcludeStylesConfig<TStyles, TRules>, "slots"> & InferStylesConfig<TStyles>["variants"]
>;

export function isStyles(target: unknown): target is Styles<any, any> {
  const candidate = target as Styles<any, any>;

  return Boolean(
    candidate &&
    candidate.definition &&
    candidate.slots &&
    typeof candidate === "function" &&
    typeof candidate.definition === "object" &&
    typeof candidate.slots === "object",
  );
}

export interface CreateStylesOptions {
  mergeClasses?(...classes: string[]): string;
}

export function createStyles<
  TSlotsValue extends SlotsValue,
  TVariantsValue extends VariantsValue<TSlotsValue>,
>(
  styles: StylesValue<TSlotsValue, TVariantsValue>,
  options: CreateStylesOptions = EMPTY_OBJECT,
): Styles<TSlotsValue, TVariantsValue> {
  const { mergeClasses = mergeClassesWithSpace } = options;

  const createConfigVariantsValue = run<
    (
      configVariants?: Partial<Variants<TSlotsValue, TVariantsValue>>,
    ) => Partial<Variants<TSlotsValue, TVariantsValue>> | undefined
  >(() => {
    const { variants } = styles;

    if (!variants) {
      return () => {
        return undefined;
      };
    }

    const { defaultVariants } = styles;

    if (!defaultVariants) {
      return (configVariants) => {
        return configVariants;
      };
    }

    return (configVariants) => {
      if (!configVariants) {
        return defaultVariants;
      }

      const mergedVariants = { ...defaultVariants };

      for (const [key, value] of Object.entries(configVariants)) {
        if (value !== undefined) {
          const name = key as keyof Variants<TSlotsValue, TVariantsValue>;

          mergedVariants[name] = value;
        }
      }

      return mergedVariants;
    };
  });

  const createVariantsSlotsValues = run<
    (
      configVariantsValue?: Partial<Variants<TSlotsValue, TVariantsValue>>,
      slotsValues?: Partial<Slots<TSlotsValue>>[],
    ) => Partial<Slots<TSlotsValue>>[]
  >(() => {
    const { variants } = styles;

    if (!variants) {
      return (_, slotsValues = []) => {
        return slotsValues;
      };
    }

    const createCompoundVariantsSlotsValues = run<
      (
        configVariantsValue: Partial<Variants<TSlotsValue, TVariantsValue>>,
        slotsValues?: Partial<Slots<TSlotsValue>>[],
      ) => Partial<Slots<TSlotsValue>>[]
    >(() => {
      const compoundVariants =
        styles.compoundVariants &&
        (Array.isArray(styles.compoundVariants)
          ? styles.compoundVariants
          : [styles.compoundVariants]);

      if (!compoundVariants || compoundVariants.length === 0) {
        return (_, slotsValues = []) => {
          return slotsValues;
        };
      }

      const compoundConditions = compoundVariants.map((compoundVariant) => {
        const { slots, variants } = compoundVariant;

        return {
          slots,
          conditions: Object.entries(variants).map(([key, value]) => {
            return [
              key,
              value,
              Array.isArray(value) ? value.map((value) => String(value)) : String(value),
            ] as const;
          }),
        };
      });

      return (configVariantsValue, slotsValues = []) => {
        for (const compoundCondition of compoundConditions) {
          const isMatch = compoundCondition.conditions.every(([key, value, valueString]) => {
            if (value === undefined) {
              return true;
            }

            const variantValue = configVariantsValue[key];

            if (variantValue === undefined) {
              return false;
            }

            if (variantValue === value) {
              return true;
            }

            const variantValueString = String(variantValue);

            if (!Array.isArray(valueString)) {
              return variantValueString === valueString;
            }

            return valueString.includes(variantValueString);
          });

          if (isMatch) {
            slotsValues.push(compoundCondition.slots);
          }
        }

        return slotsValues;
      };
    });

    return (
      configVariantsValue?: Partial<Variants<TSlotsValue, TVariantsValue>>,
      slotsValues = [],
    ) => {
      if (!configVariantsValue) {
        return slotsValues;
      }

      const configVariantsValueEntries = Object.entries(configVariantsValue);

      if (configVariantsValueEntries.length === 0) {
        return slotsValues;
      }

      let hasDefinedVariants = false;

      for (const [key, value] of configVariantsValueEntries) {
        if (value !== undefined) {
          hasDefinedVariants = true;

          const slotsValue = variants[key][String(value)];

          if (slotsValue) {
            slotsValues.push(slotsValue);
          }
        }
      }

      if (hasDefinedVariants) {
        createCompoundVariantsSlotsValues(configVariantsValue, slotsValues);
      }

      return slotsValues;
    };
  });

  const slotsEntries = Object.entries(styles.slots);

  function create(
    config?: StylesConfig<TSlotsValue, TVariantsValue>,
    overrides?: Partial<Slots<TSlotsValue>> | string,
  ): Slots<TSlotsValue> {
    if (slotsEntries.length === 0) {
      return styles.slots;
    }

    const configVariantsValue = createConfigVariantsValue(config?.variants);
    const configSlotsValue =
      config?.slots &&
      (typeof config.slots === "function"
        ? config.slots(configVariantsValue || EMPTY_OBJECT)
        : config.slots);
    const overridesSlotsValue =
      overrides &&
      (typeof overrides === "string"
        ? ({ root: overrides } as Partial<Slots<TSlotsValue>>)
        : overrides);

    const slotsValues = createVariantsSlotsValues(configVariantsValue);

    if (configSlotsValue) {
      slotsValues.push(configSlotsValue);
    }

    if (overridesSlotsValue) {
      slotsValues.push(overridesSlotsValue);
    }

    if (slotsValues.length === 0) {
      return styles.slots;
    }

    const mergedSlots = {} as Slots<TSlotsValue>;

    for (const [key, value] of slotsEntries) {
      const name = key as keyof TSlotsValue;

      const classes: string[] = [];

      for (const slots of slotsValues) {
        const value = slots[name];

        if (value) {
          classes.push(value);
        }
      }

      mergedSlots[name] = classes.length > 0 ? mergeClasses(value, ...classes) : value;
    }

    return mergedSlots;
  }

  let _slots: Slots<TSlotsValue>;

  function createSlots(
    config?: StylesConfig<TSlotsValue, TVariantsValue>,
    overrides?: Partial<Slots<TSlotsValue>> | string,
  ): Slots<TSlotsValue> {
    if ((config && (config.slots || config.variants)) || overrides) {
      return create(config, overrides);
    }

    if (!_slots) {
      _slots = create();
    }

    return _slots;
  }

  createSlots.definition = styles;

  Object.defineProperty(createSlots, "slots", {
    get() {
      return createSlots();
    },
  });

  return createSlots as Styles<TSlotsValue, TVariantsValue>;
}

function mergeClassesWithSpace(...classes: string[]) {
  return classes.join(" ");
}
