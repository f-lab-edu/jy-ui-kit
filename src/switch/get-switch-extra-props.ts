import type { GetSwitchExtraPropsArgs } from "./switch.types";

export const getSwitchExtraProps = (args: GetSwitchExtraPropsArgs) => {
  const { checked, disabled, readOnly, invalid } = args;

  const dataAttrs = {
    "data-scope": "switch",
    "data-state": checked ? "checked" : "unchecked",
    "data-disabled": disabled ? "" : undefined,
    "data-readonly": readOnly ? "" : undefined,
    "data-invalid": invalid ? "" : undefined,
  };

  return {
    rootProps: {
      ...dataAttrs,
      "data-part": "root",
      role: "switch",
      "aria-checked": checked,
      "aria-readonly": readOnly || undefined,
      "aria-invalid": invalid || undefined,
    },

    thumbProps: {
      ...dataAttrs,
      "data-part": "thumb",
    },
  } as const;
};
