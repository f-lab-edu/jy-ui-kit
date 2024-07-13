import { useCallback, useState } from "react";

import type { Dispatch, SetStateAction } from "react";

export interface UseControllableParams<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
}

export type SetStateFn<T> = (prevState?: T) => T;

export const useControllableState = <T>({ value, defaultValue, onChange }: UseControllableParams<T>) => {
  const [unControlledValue, setUnControlledValue] = useState(defaultValue as T);

  const isControlled = value !== undefined;
  const state = isControlled ? value : unControlledValue;

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      const setter = value as SetStateFn<T>;
      const nextValue = typeof value === "function" ? setter(state) : value;

      if (!isControlled) {
        setUnControlledValue(value);
      }

      onChange?.(nextValue);
    },
    [isControlled, state, onChange],
  );

  return [state, setState] as const;
};
