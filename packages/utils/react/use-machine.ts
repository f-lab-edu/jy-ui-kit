import { useMachine as useXstateMachine } from "@xstate/react";
import { useEffect } from "react";

import type { Actor, ActorOptions, AnyStateMachine } from "xstate";

export const useMachine = <Machine extends AnyStateMachine>(machine: Machine, options?: ActorOptions<Machine>) => {
  const actor = useXstateMachine(machine, options);
  const send = actor[1] as Actor<AnyStateMachine>["send"];

  useEffect(() => {
    send({ type: "SET_CONTEXT", context: options?.input });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(options?.input ?? {}), send]);

  return actor;
};
