import { EMPTY_OBJECT, run, type Simplify } from "./internals";

export type ClassValue = string;

export type ClassesValue = {
  [name: string]: ClassValue;
};

export type VariantPrimitive = string | number;

export type VariantValue<TVariantValue extends VariantPrimitive> = TVariantValue extends
  | "true"
  | "false"
  ? boolean
  : TVariantValue;

export type VariantsValue<TClassesValue extends ClassesValue> = {
  [name: string]: {
    [value: VariantPrimitive]: Partial<TClassesValue>;
  };
};

export type Variants<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> = {
  [TName in keyof TVariantsValue]: VariantValue<keyof TVariantsValue[TName] & VariantPrimitive>;
};

export type CompoundVariantVariantsValue<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> = {
  [TName in keyof TVariantsValue]?:
    | VariantValue<keyof TVariantsValue[TName] & VariantPrimitive>
    | VariantValue<keyof TVariantsValue[TName] & VariantPrimitive>[];
};

export interface CompoundVariant<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> {
  variants: CompoundVariantVariantsValue<TClassesValue, TVariantsValue>;
  classes: Partial<TClassesValue>;
}

export type CompoundVariants<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> =
  | CompoundVariant<TClassesValue, TVariantsValue>
  | CompoundVariant<TClassesValue, TVariantsValue>[];

export interface StylesValue<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> {
  classes: TClassesValue;
  variants?: TVariantsValue;
  compoundVariants?: CompoundVariants<TClassesValue, TVariantsValue>;
  defaultVariants?: Partial<Variants<TClassesValue, TVariantsValue>>;
}

export interface StylesConfig<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> {
  classes?:
    | ((
        variants: Partial<Variants<TClassesValue, TVariantsValue>>,
      ) => Partial<TClassesValue> | undefined)
    | Partial<TClassesValue>;
  variants?: Partial<Variants<TClassesValue, TVariantsValue>>;
}

export interface Styles<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
> {
  (
    config?: StylesConfig<TClassesValue, TVariantsValue>,
    overrides?: Partial<TClassesValue> | string,
  ): TClassesValue;
  definition: StylesValue<TClassesValue, TVariantsValue>;
  classes: TClassesValue;
}

export type InferStylesConfig<T extends Styles<any, any>> =
  T extends Styles<infer TClassesValue, infer TVariantsValue>
    ? StylesConfig<TClassesValue, VariantsValue<any> extends TVariantsValue ? {} : TVariantsValue>
    : never;

export type InferComponentStylesConfig<T extends Styles<any, any>> = Simplify<
  Pick<InferStylesConfig<T>, "classes"> & InferStylesConfig<T>["variants"]
>;

export function isStylesType(target: any): target is Styles<any, any> {
  const candidate = target as Styles<any, any>;

  return Boolean(
    candidate &&
    typeof candidate === "function" &&
    candidate.definition &&
    typeof candidate.definition === "object" &&
    candidate.classes &&
    typeof candidate.classes === "object",
  );
}

export interface CreateStylesOptions {
  mergeClasses?(...classes: string[]): string;
}

export function createStyles<
  TClassesValue extends ClassesValue,
  TVariantsValue extends VariantsValue<TClassesValue>,
>(
  styles: StylesValue<TClassesValue, TVariantsValue>,
  options: CreateStylesOptions = EMPTY_OBJECT,
): Styles<TClassesValue, TVariantsValue> {
  const { mergeClasses = mergeClassesWithSpace } = options;

  const createConfigVariantsValue = run<
    (
      configVariants?: Partial<Variants<TClassesValue, TVariantsValue>>,
    ) => Partial<Variants<TClassesValue, TVariantsValue>> | undefined
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

      return {
        ...defaultVariants,
        ...Object.entries(configVariants).reduce(
          (result, [key, value]) => {
            if (value !== undefined) {
              result[key as keyof Partial<Variants<TClassesValue, TVariantsValue>>] = value;
            }

            return result;
          },
          {} as Partial<Variants<TClassesValue, TVariantsValue>>,
        ),
      };
    };
  });

  const createVariantsClassesValues = run<
    (
      configVariantsValue?: Partial<Variants<TClassesValue, TVariantsValue>>,
      classesValues?: Partial<TClassesValue>[],
    ) => Partial<TClassesValue>[]
  >(() => {
    const { variants } = styles;

    if (!variants) {
      return (_, classesValues = []) => {
        return classesValues;
      };
    }

    const createCompoundVariantsClassesValues = run<
      (
        configVariantsValue: Partial<Variants<TClassesValue, TVariantsValue>>,
        classesValues?: Partial<TClassesValue>[],
      ) => Partial<TClassesValue>[]
    >(() => {
      const compoundVariants =
        styles.compoundVariants &&
        (Array.isArray(styles.compoundVariants)
          ? styles.compoundVariants
          : [styles.compoundVariants]);

      if (!compoundVariants || compoundVariants.length === 0) {
        return (_, classesValues = []) => {
          return classesValues;
        };
      }

      return (configVariantsValue, classesValues = []) => {
        for (const compoundVariant of compoundVariants) {
          const isMatched = Object.entries(compoundVariant.variants).every(
            ([compoundVariantName, compoundVariantValue]) => {
              if (compoundVariantValue === undefined) {
                return true;
              }

              const configVariantValue = configVariantsValue[compoundVariantName];

              if (configVariantValue === undefined) {
                return false;
              }

              if (configVariantValue === compoundVariantValue) {
                return true;
              }

              const configVariantValueString = String(configVariantValue);

              if (!Array.isArray(compoundVariantValue)) {
                return String(compoundVariantValue) === configVariantValueString;
              }

              return compoundVariantValue.some(
                (value) => String(value) === configVariantValueString,
              );
            },
          );

          if (isMatched) {
            classesValues.push(compoundVariant.classes);
          }
        }

        return classesValues;
      };
    });

    return (
      configVariantsValue?: Partial<Variants<TClassesValue, TVariantsValue>>,
      classesValues = [],
    ) => {
      if (!configVariantsValue) {
        return classesValues;
      }

      const configVariantsValueEntries = Object.entries(configVariantsValue);

      if (configVariantsValueEntries.length === 0) {
        return classesValues;
      }

      let isNonEmptyVariantsValue = false;

      for (const [configVariantName, configVariantValue] of configVariantsValueEntries) {
        if (configVariantValue !== undefined) {
          isNonEmptyVariantsValue = true;

          const configVariantClassesValue = variants[configVariantName][String(configVariantValue)];

          if (configVariantClassesValue) {
            classesValues.push(configVariantClassesValue);
          }
        }
      }

      if (isNonEmptyVariantsValue) {
        createCompoundVariantsClassesValues(configVariantsValue, classesValues);
      }

      return classesValues;
    };
  });

  function create(
    config?: StylesConfig<TClassesValue, TVariantsValue>,
    overrides?: Partial<TClassesValue> | string,
  ) {
    const configVariantsValue = createConfigVariantsValue(config?.variants);
    const configClassesValue =
      config?.classes &&
      (typeof config.classes === "function"
        ? config.classes(configVariantsValue || EMPTY_OBJECT)
        : config.classes);
    const overridesClassesValue =
      overrides &&
      (typeof overrides === "string"
        ? ({ root: overrides } as unknown as Partial<TClassesValue>)
        : overrides);

    const classesValues = createVariantsClassesValues(configVariantsValue);

    if (configClassesValue) {
      classesValues.push(configClassesValue);
    }

    if (overridesClassesValue) {
      classesValues.push(overridesClassesValue);
    }

    if (classesValues.length === 0) {
      return styles.classes;
    }

    return Object.entries(styles.classes).reduce((result, [key, value]) => {
      const name = key as keyof TClassesValue;

      const classes = classesValues.reduce<string[]>((result, classes) => {
        const value = classes[name];

        if (value) {
          result.push(value);
        }

        return result;
      }, []);

      result[name] = (
        classes.length > 0 ? mergeClasses(value, ...classes) : value
      ) as TClassesValue[keyof TClassesValue];

      return result;
    }, {} as TClassesValue);
  }

  let _classes: TClassesValue;

  function createClasses(
    config?: StylesConfig<TClassesValue, TVariantsValue>,
    overrides?: Partial<TClassesValue> | string,
  ): TClassesValue {
    if ((config && (config.classes || config.variants)) || overrides) {
      return create(config, overrides);
    }

    if (!_classes) {
      _classes = create();
    }

    return _classes;
  }

  createClasses.definition = styles;

  Object.defineProperty(createClasses, "classes", {
    get() {
      return createClasses();
    },
  });

  return createClasses as Styles<TClassesValue, TVariantsValue>;
}

function mergeClassesWithSpace(...classes: string[]) {
  return classes.join(" ");
}
