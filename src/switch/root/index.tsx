import { forwardRef } from "react";

import { Slot } from "@/slot";
import { createContext, mergeProps } from "@/utils/react";

import { getSwitchExtraProps } from "../get-switch-extra-props";

import { useSwitch } from "./use-switch";

import type { SwitchContext, SwitchRootProps } from "../switch.types";
import type { ForwardedRef } from "react";

const [SwitchProvider, useContext] = createContext<SwitchContext>({
  contextName: "SwitchContext",
  consumerHookName: "useSwitchContext",
});

export const useSwitchContext = useContext;

export const Switch = forwardRef((props: SwitchRootProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { asChild, ...switchRootProps } = props;

  const Comp = asChild ? Slot : "button";

  const { checked, readOnly = false, invalid = false, ...computedRootProps } = useSwitch(switchRootProps);
  const { disabled } = computedRootProps;

  const extraProps = getSwitchExtraProps({ checked, disabled, readOnly, invalid });

  return (
    <SwitchProvider value={{ extraProps }}>
      <Comp ref={forwardedRef} {...mergeProps(extraProps.rootProps, computedRootProps)} />
    </SwitchProvider>
  );
});

Switch.displayName = "Switch.Root";

export const Root = Switch;
