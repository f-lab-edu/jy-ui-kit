import { Slot } from "@jy-headless-ui/slot";
import { createContext, useMachine } from "@jy-headless-ui/utils";
import clsx from "clsx";
import { forwardRef } from "react";

import { checkboxMachineConnector } from "../machine/checkbox-connector";
import { checkboxMachine } from "../machine/checkbox-machine";

import { base_checkbox_root } from "./root.css";

import type { CheckboxContext, CheckboxProps } from "../checkbox.types";
import type { ForwardedRef } from "react";

const [CheckboxProvider, useContext] = createContext<CheckboxContext>({
  contextName: "CheckboxContext",
  consumerHookName: "useCheckboxContext",
});

export const useCheckboxContext = useContext;

export const Checkbox = forwardRef((props: CheckboxProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { asChild, className, onCheckedChange, ...checkboxProps } = props;
  const Comp = asChild ? Slot : "button";

  const [state, send] = useMachine(checkboxMachine, {
    input: {
      checked: checkboxProps.checked,
      disabled: checkboxProps.disabled,
      onCheckedChange,
      onPointerMove: checkboxProps?.onPointerMove,
      onPointerLeave: checkboxProps?.onPointerLeave,
      onKeyDown: checkboxProps?.onKeyDown,
      onFocus: checkboxProps?.onFocus,
      onBlur: checkboxProps?.onBlur,
      onClick: checkboxProps?.onClick,
    },
  });
  const api = checkboxMachineConnector(state, send);

  return (
    <CheckboxProvider value={{ checkboxMachineState: state, send, api }}>
      <Comp
        className={clsx(base_checkbox_root, "base-checkbox-root", className)}
        ref={forwardedRef}
        {...checkboxProps}
        {...api.rootProps}
      />
    </CheckboxProvider>
  );
});

Checkbox.displayName = "Checkbox.Root";

export const Root = Checkbox;
