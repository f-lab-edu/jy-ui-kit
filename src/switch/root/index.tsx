import { forwardRef } from "react";

import { Slot } from "@/slot";
import { mergeProps } from "@/utils/react";

import { getSwitchExtraProps } from "../get-switch-extra-props";

import { useSwitch } from "./use-switch";

import type { SwitchRootProps } from "../switch.types";
import type { ForwardedRef } from "react";

export const Switch = forwardRef((props: SwitchRootProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { asChild, ...switchRootProps } = props;

  const Comp = asChild ? Slot : "button";

  const { checked, ...computedRootProps } = useSwitch(switchRootProps);
  const { disabled } = computedRootProps;

  const extraProps = getSwitchExtraProps({ checked, disabled });

  return <Comp ref={forwardedRef} {...mergeProps(extraProps.rootProps, computedRootProps)} />;
});

Switch.displayName = "Switch.Root";

export const Root = Switch;
