import { useLayoutEffect, useReducer, useRef, useState } from "react";

import type { PresenceReducerAction, PresenceState, PresenceStateFlow } from "../presence.types";

const getAnimationName = (styles: CSSStyleDeclaration) => {
  return styles.animationName;
};

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
  const [element, setElement] = useState<HTMLElement | null>(null);

  const elementStyles = useRef({} as CSSStyleDeclaration);
  const prevAnimationName = useRef("none");
  const prevPresent = useRef(present);

  useLayoutEffect(() => {
    const presentChanged = prevPresent.current !== present;

    if (presentChanged) {
      const currentAnimationName = getAnimationName(elementStyles.current);

      if (present) {
        dispatchPresenceState("MOUNT");
      } else {
        if (currentAnimationName === "none" || elementStyles.current.display === "none") {
          // animation 이 동작할 필요 없는 경우
          dispatchPresenceState("UNMOUNT");
        } else {
          const isAnimating = prevAnimationName.current !== currentAnimationName;

          if (prevPresent.current && isAnimating) {
            // 퇴장 animation 이 동작하는 경우
            dispatchPresenceState("ANIMATION_START");
          } else {
            dispatchPresenceState("UNMOUNT");
          }
        }
      }
    }

    prevPresent.current = present;
  }, [present]);

  useLayoutEffect(() => {
    if (!element) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      const animationTarget = event.target;

      if (!(animationTarget instanceof HTMLElement) || animationTarget !== element) return;

      const currentAnimationName = getAnimationName(elementStyles.current);
      const isCurrentAnimation = currentAnimationName.includes(getComputedStyle(animationTarget).animationName);

      if (isCurrentAnimation) {
        dispatchPresenceState("ANIMATION_END");
      }
    };

    element.addEventListener("animationcancel", handleAnimationEnd);
    element.addEventListener("animationend", handleAnimationEnd);

    return () => {
      element.removeEventListener("animationcancel", handleAnimationEnd);
      element.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [element]);

  presenceState;
  dispatchPresenceState;

  return {
    ref: (elem: HTMLElement | null) => {
      if (elem) elementStyles.current = getComputedStyle(elem);
      setElement(elem);
    },
  };
};
