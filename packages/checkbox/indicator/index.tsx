import { Slot } from "@jy-ui/slot";
import clsx from "clsx";
import { forwardRef } from "react";

import { useCheckboxContext } from "../root";

import { base_checkbox_indicator } from "./indicator.css";

import type { CheckboxIndicatorProps } from "../checkbox.types";
import type { ForwardedRef } from "react";

export const CheckboxIndicator = forwardRef(
  (props: CheckboxIndicatorProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
    const { asChild, className, children, ...CheckboxIndicatorProps } = props;

    const Comp = asChild ? Slot : "span";

    const checkboxContext = useCheckboxContext();

    const currentCheckStatus =
      checkboxContext?.checkboxMachineState.value === "indeterminate"
        ? checkboxContext?.checkboxMachineState.value
        : checkboxContext?.checkboxMachineState.value === "checked";

    if (currentCheckStatus === "indeterminate" || currentCheckStatus) {
      return (
        <Comp
          className={clsx(base_checkbox_indicator, "base-checkbox-indicator", className)}
          ref={forwardedRef}
          {...CheckboxIndicatorProps}
          {...checkboxContext?.api.indicatorProps}
        >
          {typeof children === "function" ? children(currentCheckStatus) : children}
        </Comp>
      );
    }

    return null;
  },
);

CheckboxIndicator.displayName = "Checkbox.Indicator";

export const Indicator = CheckboxIndicator;
