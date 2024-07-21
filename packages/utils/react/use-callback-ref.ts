import { useEffect, useRef } from "react";

import type { AnyFunc } from "@jy-headless-ui/types";

export const useCallbackRef = <T extends AnyFunc>(callback?: T) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return callbackRef;
};
