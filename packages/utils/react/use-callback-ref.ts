import { useEffect, useRef } from "react";

export const useCallbackRef = <T extends AnyFunc>(callback?: T) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return callbackRef;
};
