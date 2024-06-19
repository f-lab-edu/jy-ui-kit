import { forwardRef } from "react";

import { Slot } from "@/slot";

import type { SwitchRootProps } from "../switch.types";
import type { ForwardedRef } from "react";

export const Switch = forwardRef((props: SwitchRootProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { asChild, ...switchProps } = props;

  const Comp = asChild ? Slot : "button";

  return <Comp ref={forwardedRef} {...switchProps} />;
});

Switch.displayName = "Switch.Root";

export const Root = Switch;
