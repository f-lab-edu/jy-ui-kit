import clsx from "clsx";
import { forwardRef } from "react";

import { Slot } from "@/slot";

import { useSwitchContext } from "../root";

import type { SwitchThumbProps } from "../switch.types";
import type { ForwardedRef } from "react";

export const SwitchThumb = forwardRef((props: SwitchThumbProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, ...switchThumbProps } = props;
  const { className } = switchThumbProps;

  const Comp = asChild ? Slot : "span";

  const switchContext = useSwitchContext();

  return (
    <Comp
      ref={forwardedRef}
      className={clsx("base-switch-thumb", className)}
      {...switchThumbProps}
      {...switchContext?.extraProps.thumbProps}
    />
  );
});

SwitchThumb.displayName = "Switch.Thumb";

export const Thumb = SwitchThumb;
