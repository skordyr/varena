import type { CreateStylesOptions } from "./styles";
import type { CreateTokensOptions } from "./tokens";

import { EMPTY_OBJECT, run } from "./internals";
import { createStyles } from "./styles";
import { createTokens } from "./tokens";
import { sx } from "./utils";

export interface Varena {
  createTokens: typeof createTokens;
  createStyles: typeof createStyles;
}

export interface CreateOptions
  extends
    Pick<CreateTokensOptions, "createVariableName">,
    Pick<CreateStylesOptions, "mergeClasses"> {}

export function create(options: CreateOptions = EMPTY_OBJECT): Varena {
  const { createVariableName, mergeClasses } = options;

  return {
    createTokens: run(() => {
      if (createVariableName) {
        const presets = { createVariableName } satisfies CreateTokensOptions;

        return (tokens, options) => {
          return createTokens(tokens, sx(presets, options));
        };
      }

      return createTokens;
    }),
    createStyles: run(() => {
      if (mergeClasses) {
        const presets = { mergeClasses } satisfies CreateStylesOptions;

        return (styles, options) => {
          return createStyles(styles, sx(presets, options));
        };
      }

      return createStyles;
    }),
  };
}
