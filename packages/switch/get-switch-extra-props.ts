import type { GetSwitchExtraPropsArgs } from "./switch.types";

export const getSwitchExtraProps = (args: GetSwitchExtraPropsArgs) => {
  const { checked, disabled, readOnly, invalid, required } = args;

  const dataAttrs = {
    "data-scope": "switch",
    "data-state": checked ? "checked" : "unchecked",
    "data-disabled": disabled ? "" : undefined,
    "data-readonly": readOnly ? "" : undefined,
    "data-invalid": invalid ? "" : undefined,
  };

  const ariaAttrs = {
    "aria-checked": checked,
    "aria-readonly": readOnly || undefined,
    "aria-invalid": invalid || undefined,
    "aria-required": required || undefined,
  };

  return {
    rootProps: {
      ...dataAttrs,
      "data-part": "control",
      role: "switch",
      ...ariaAttrs,
    },

    thumbProps: {
      ...dataAttrs,
      "data-part": "thumb",
    },

    hiddenInputProps: {
      ...dataAttrs,
      ...ariaAttrs,
      role: "switch",
      "aria-hidden": true,
    },
  } as const;
};
