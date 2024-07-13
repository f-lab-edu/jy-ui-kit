import { createContext as reactCreateContext, useContext as reactUseContext } from "react";

import type { Context, Provider } from "react";

export interface CreateContextOptions<T> {
  strict?: boolean;
  contextName?: string;
  consumerHookName?: string;
  errorMessage?: string;
  defaultValue?: T;
}

export type CreateContextReturn<T> = [Provider<T | undefined>, () => T | undefined, Context<T | undefined>];

export const createContext = <T>(options: CreateContextOptions<T> = {}): CreateContextReturn<T> => {
  const {
    strict = true,
    contextName = "Context",
    consumerHookName = "useContext",
    errorMessage,
    defaultValue,
  } = options;

  const Context = reactCreateContext(defaultValue);

  Context.displayName = contextName;

  const useContext = () => {
    const context = reactUseContext(Context);

    if (strict && !context) {
      const error = new Error(
        errorMessage ?? `${consumerHookName}은(는) ${contextName} Provider 내부에서만 사용할 수 있습니다.`,
      );
      error.name = "ContextError";

      throw error;
    }

    return context;
  };

  return [Context.Provider, useContext, Context];
};
