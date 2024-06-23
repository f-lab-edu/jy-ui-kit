import { forwardRef } from "react";

import { Slot } from "@/slot";
import { mergeProps } from "@/utils/react";

import { useSwitchContext } from "../root";

import type { SwitchThumbProps } from "../switch.types";
import type { ForwardedRef } from "react";

export const SwitchThumb = forwardRef((props: SwitchThumbProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, ...switchThumbProps } = props;

  const Comp = asChild ? Slot : "span";

  const switchContext = useSwitchContext();

  return <Comp ref={forwardedRef} {...mergeProps(switchContext?.extraProps.thumbProps, switchThumbProps)} />;
});

SwitchThumb.displayName = "Switch.Thumb";

export const Thumb = SwitchThumb;
