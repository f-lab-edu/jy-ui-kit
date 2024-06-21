import { combineEventHandlers, useControllableState } from "@/utils/react";

import type { UseSwitchArgs } from "../switch.types";

export const useSwitch = (args: UseSwitchArgs) => {
  const { defaultChecked, onSwitchStateChange, ...switchRootProps } = args;

  const [checked = false, setChecked] = useControllableState({
    defaultValue: defaultChecked,
    onChange: onSwitchStateChange,
  });

  const handleSwitchClick = combineEventHandlers(switchRootProps.onClick, () => {
    if (switchRootProps.readOnly) return;
    setChecked((prevValue) => !prevValue);
  });

  return {
    checked,
    ...switchRootProps,
    onClick: handleSwitchClick,
  } as const;
};
