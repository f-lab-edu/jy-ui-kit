import { and, assign, enqueueActions, not, raise, setup } from "xstate";

import type {
  CheckboxMachineContext,
  CheckboxMachineEvent,
  CheckboxMachineInput,
  CheckboxMachineState,
} from "../checkbox.types";

export const getCurCheckState = (value: CheckboxMachineState["value"]) => {
  return value === "indeterminate" ? "indeterminate" : value === "checked";
};

const getStateTransitionEventType = (context: CheckboxMachineContext): CheckboxMachineEvent => {
  switch (context.checked) {
    case "indeterminate": {
      return { type: "CHECKBOX.INDETERMINATE" };
    }
    case true: {
      return { type: "CHECKBOX.CHECKED" };
    }
    case false:
    default: {
      return { type: "CHECKBOX.UNCHECKED" };
    }
  }
};

export const checkboxMachine = setup({
  types: {
    context: {} as CheckboxMachineContext,
    input: {} as CheckboxMachineInput,
    events: {} as CheckboxMachineEvent,
  },

  guards: {
    isControlled: ({ context }) => !!context.isControlled,
    isEnabled: ({ context }) => !context.disabled,
    isClickable: and(["isEnabled", not("isControlled")]),
  },

  actions: {
    setContext: assign(({ event, context }) => {
      return event.type === "SET_CONTEXT" ? { ...context, ...event.context } : context;
    }),
    watchChecked: assign(({ context }) => ({ ...context, isControlled: context.checked !== undefined })),
    syncControlledState: raise(({ context }) => getStateTransitionEventType(context)),
    onCheckedChange: ({ context, self }) => {
      const curState = getCurCheckState(self.getSnapshot().value as CheckboxMachineState["value"]);
      context.onCheckedChange?.(curState === "indeterminate" ? true : !curState);
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsBGB7AHgMQDCAEgKLEDSAQgPIAaAdAMrkAqA+sXQHLvkG7ANoAGALqJQAB1ywAlgBd5uAHZSQ+RAA4ArE20B2XQBoQAT0QBGAEwBfO2bQYcBEhWr1mbLj36CRK0kkEFkFZTUNLQQATismABYrBNEANhtTC0RdbRsmGLSMhyd0LDwiMkpaRiZK6nIAETFgmTklFXUQ6N1DM0sEAGZDVKZU3XTdYpBnMrc66uYAVV55xuaNMPbIruzerIQEwxjR8aLHadLXCo8FpgBJXgaOcgAlAFkHgEEBdZDNiM6oG6e36NkMAxOEwc51UuAgcA0MyuGzaAKiiBifWsVkMiUKk3OSPKTCRkBR4Q66MGNmOMRsViMmX6A10CXy+KmRIITAArqpSRByVtAZpEAMafl6YysQceuyoYTLsT5Kp4YowAAnAC2KoAhuqhWidtTaVLjDKMvECgqHEA */
  id: "checkbox",

  context: ({ input }) => {
    return {
      isControlled: input?.checked !== undefined,
      disabled: input?.disabled ?? false,
      checked: input?.checked,
      hover: false,
      focus: false,
      onCheckedChange: input.onCheckedChange,
    };
  },

  on: {
    SET_CONTEXT: {
      actions: [
        "setContext",
        "watchChecked",
        enqueueActions(({ enqueue, check }) => {
          if (check("isControlled")) {
            enqueue("syncControlledState");
          }
        }),
      ],
    },
    "CHECKBOX.CHECKED": ".checked",
    "CHECKBOX.UNCHECKED": ".unchecked",
    "CHECKBOX.INDETERMINATE": ".indeterminate",
  },

  initial: "unchecked",

  states: {
    checked: {
      description: "체크된 상태",
      on: {
        "CHECKBOX.TOGGLE": [
          { guard: "isClickable", actions: ["onCheckedChange"], target: "unchecked" },
          { actions: ["onCheckedChange"] },
        ],
      },
    },

    unchecked: {
      description: "체크되지 않은 상태",
      on: {
        "CHECKBOX.TOGGLE": [
          { guard: "isClickable", actions: ["onCheckedChange"], target: "checked" },
          { actions: ["onCheckedChange"] },
        ],
      },
    },

    indeterminate: {
      description: "부분적으로 체크된 상태",
      on: {
        "CHECKBOX.TOGGLE": [
          { guard: "isClickable", actions: ["onCheckedChange"], target: "checked" },
          { actions: ["onCheckedChange"] },
        ],
      },
    },
  },
});

export const machine = checkboxMachine;
