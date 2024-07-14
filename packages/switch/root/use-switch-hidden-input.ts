import { useEffect, useRef } from "react";

import type { UseSwitchHiddenInputArgs } from "../switch.types";

export const useSwitchHiddenInput = (args: UseSwitchHiddenInputArgs) => {
  const { checked, inputRef } = args;

  const previousCheckStatus = useRef(checked);

  useEffect(() => {
    if (!inputRef.current) return;

    if (previousCheckStatus.current !== checked) {
      const clickEvent = new MouseEvent("click", { bubbles: true });
      inputRef.current.dispatchEvent(clickEvent);

      previousCheckStatus.current = checked;
    }
    // inputRef 의존성 배열에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
};
