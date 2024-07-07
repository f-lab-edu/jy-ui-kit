import { useReducer } from "react";

import type { PresenceReducerAction, PresenceState, PresenceStateFlow } from "../presence.types";

const presenceStateReducer = (state: PresenceState, action: PresenceReducerAction): PresenceState => {
  /**
   * @description {[current state]: {action: next state}}
   */
  const stateFlow: PresenceStateFlow = {
    MOUNTED: {
      UNMOUNT: "UNMOUNTED",
      ANIMATION_START: "UNMOUNT_SUSPENDED",
    },
    UNMOUNT_SUSPENDED: {
      MOUNT: "MOUNTED",
      ANIMATION_END: "UNMOUNTED",
    },
    UNMOUNTED: {
      MOUNT: "MOUNTED",
    },
  };

  return stateFlow[state]?.[action] ?? state;
};

export const usePresence = (present: boolean) => {
  const initialPresenceState: PresenceState = present ? "MOUNTED" : "UNMOUNTED";
  const [presenceState, dispatchPresenceState] = useReducer(presenceStateReducer, initialPresenceState);

  presenceState;
  dispatchPresenceState;
};
