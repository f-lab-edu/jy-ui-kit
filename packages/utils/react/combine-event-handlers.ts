import type { SyntheticEvent } from "react";

export const combineEventHandlers = <Event extends SyntheticEvent>(
  originalEventHandler?: (event: Event) => void,
  machineEventHandler?: (event: Event) => void,
  preventDefault = false,
) => {
  return function handleEvent(event: Event) {
    originalEventHandler?.(event);

    if (!preventDefault || !event.defaultPrevented) {
      return machineEventHandler?.(event);
    }
  };
};
