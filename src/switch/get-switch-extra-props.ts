import type { GetSwitchExtraPropsArgs } from "./switch.types";

export const getSwitchExtraProps = (args: GetSwitchExtraPropsArgs) => {
  const { checked, disabled } = args;

  const dataAttrs = {
    "data-scope": "switch",
    "data-state": checked ? "checked" : "unchecked",
    "data-disabled": disabled ? "" : undefined,
  };

  return {
    rootProps: {
      ...dataAttrs,
      "data-part": "root",
      role: "switch",
      "aria-checked": checked,
    },
  } as const;
};
