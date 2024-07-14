import type { ButtonProps } from "../../button.types";
import type { ComponentPropsWithoutRef } from "react";

const useButton = (buttonProps?: ButtonProps) => {
  const buttonA11y: AriaAttributeWithRole = {
    role: "button",
    "aria-disabled": buttonProps?.disabled ? "true" : "false",
  };

  const computedButtonProps: ComponentPropsWithoutRef<"button"> = {
    ...buttonProps,
    type: buttonProps?.type ?? (!buttonProps?.asChild ? "button" : undefined),
  };

  return {
    buttonA11y,
    computedButtonProps,
  };
};

export default useButton;
