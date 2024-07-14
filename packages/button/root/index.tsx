import { Slot } from "@jy-headless-ui/slot";
import clsx from "clsx";
import { forwardRef } from "react";

import { base_button_root } from "./button.css";
import useButton from "./hooks/useButton";

import type { ButtonProps } from "../button.types";
import type { ForwardedRef } from "react";

export const Button = forwardRef((props: ButtonProps, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const { asChild, className } = props;

  const { buttonA11y, computedButtonProps } = useButton(props);

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(base_button_root, "base-button-root", className)}
      ref={forwardedRef}
      {...buttonA11y}
      {...computedButtonProps}
    />
  );
});

Button.displayName = "Button";
