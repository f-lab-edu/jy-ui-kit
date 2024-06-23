import clsx from "clsx";
import { forwardRef, useRef } from "react";

import { Slot } from "@/slot";
import { createContext } from "@/utils/react";

import { getSwitchExtraProps } from "../get-switch-extra-props";

import { base_switch_hidden_input } from "./root.css";
import { useSwitch } from "./use-switch";
import { useSwitchHiddenInput } from "./use-switch-hidden-input";

import type { SwitchContext, SwitchHiddenInputProps, SwitchRootProps } from "../switch.types";
import type { ForwardedRef } from "react";

const [SwitchProvider, useContext] = createContext<SwitchContext>({
  contextName: "SwitchContext",
  consumerHookName: "useSwitchContext",
});

export const useSwitchContext = useContext;

export const Switch = forwardRef((props: SwitchRootProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { asChild, ...switchRootProps } = props;

  const Comp = asChild ? Slot : "button";

  const {
    checked,
    readOnly = false,
    invalid = false,
    required,
    className,
    ...computedRootProps
  } = useSwitch(switchRootProps);
  const { disabled, name, value } = computedRootProps;

  const extraProps = getSwitchExtraProps({ checked, disabled, readOnly, invalid, required });

  return (
    <SwitchProvider value={{ extraProps }}>
      <Comp
        ref={forwardedRef}
        className={clsx("base-switch-root", className)}
        {...computedRootProps}
        {...extraProps.rootProps}
      />
      <HiddenInput
        name={name}
        value={value}
        checked={checked}
        required={required}
        disabled={disabled}
        extraProps={extraProps.hiddenInputProps}
      />
    </SwitchProvider>
  );
});

Switch.displayName = "Switch.Root";

export const Root = Switch;

const HiddenInput = (props: SwitchHiddenInputProps) => {
  const { checked, className, extraProps, ...hiddenInputProps } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useSwitchHiddenInput({ checked, inputRef });

  return (
    <input
      type="checkbox"
      ref={inputRef}
      tabIndex={-1}
      className={clsx(base_switch_hidden_input, className)}
      defaultChecked={checked}
      {...hiddenInputProps}
      {...extraProps}
    />
  );
};
