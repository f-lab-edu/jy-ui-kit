export type PresenceState = "MOUNTED" | "UNMOUNTED" | "UNMOUNT_SUSPENDED";

export type PresenceReducerAction = "MOUNT" | "ANIMATION_START" | "ANIMATION_END" | "UNMOUNT";

export type PresenceStateFlow = {
  [S in PresenceState]?: {
    [A in PresenceReducerAction]?: PresenceState;
  };
};
