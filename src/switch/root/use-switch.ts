import { combineEventHandlers, useControllableState } from "@/utils/react";

import type { UseSwitchArgs } from "../switch.types";

export const useSwitch = (args: UseSwitchArgs) => {
  const { checked: checkedProps, defaultChecked, onSwitchStateChange, ...switchRootProps } = args;

  const [checked = false, setChecked] = useControllableState({
    value: checkedProps,
    defaultValue: defaultChecked,
    onChange: onSwitchStateChange,
  });

  const handleSwitchClick = combineEventHandlers(switchRootProps.onClick, (e) => {
    e.stopPropagation();

    if (switchRootProps.readOnly) return;
    setChecked((prevValue) => !prevValue);
  });

  return {
    checked,
    ...switchRootProps,
    onClick: handleSwitchClick,
  } as const;
};
