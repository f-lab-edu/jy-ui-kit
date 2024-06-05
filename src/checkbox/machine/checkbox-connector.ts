import { combineEventHandlers } from "@/utils/react";

import type { CheckboxMachineSend, CheckboxMachineState } from "../checkbox.types";
import type { KeyboardEvent } from "react";

export const connector = (state: CheckboxMachineState, send: CheckboxMachineSend) => {
  const disabled = state.context.disabled;
  const focus = state.context.focus;
  const hover = state.context.hover;

  const dataAttr = {
    "data-scope": "checkbox",
    "data-hover": hover,
    "data-state": state.value,
    "data-disabled": disabled,
    "data-focus": focus,
  };

  const ariaAttr: AriaAttributeWithRole = {
    role: "checkbox",
    "aria-checked": state.value === "indeterminate" ? "mixed" : state.value === "checked",
  };

  return {
    disabled,
    rootProps: {
      ...dataAttr,
      ...ariaAttr,
      "data-part": "root",
      disabled,
      onPointerMove: combineEventHandlers(state.context.onPointerMove, () => {
        if (disabled) return;
        send({ type: "SET_CONTEXT", context: { hover: true } });
      }),
      onPointerLeave: combineEventHandlers(state.context.onPointerLeave, () => {
        send({ type: "SET_CONTEXT", context: { hover: false } });
      }),
      onKeyDown: combineEventHandlers(state.context.onKeyDown, (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Enter") event.preventDefault;
      }),
      onFocus: combineEventHandlers(state.context.onFocus, () => {
        send({ type: "SET_CONTEXT", context: { focus: true } });
      }),
      onBlur: combineEventHandlers(state.context.onFocus, () => {
        if (disabled) return;
        send({ type: "SET_CONTEXT", context: { focus: false } });
      }),
      onClick: combineEventHandlers(state.context.onClick, () => {
        send({ type: "CHECKBOX.TOGGLE" });
      }),
    },
  } as const;
};

export const checkboxMachineConnector = connector;
