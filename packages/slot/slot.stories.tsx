import { forwardRef } from "react";

import * as Slot from "./index";

import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentPropsWithoutRef, ForwardedRef } from "react";

const meta = {
  title: "Components/Slot",
  component: Slot.Root,
} satisfies Meta<typeof Slot.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * @todo 다른 컴포넌트로 대체
 */
const Button = forwardRef((props: ComponentPropsWithoutRef<"element">, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button ref={ref} {...props}>
      {props.children}
    </button>
  );
});

Button.displayName = "Button";

export const Default: Story = {
  render: () => (
    <Slot.Root className="slot-class" style={{ color: "red" }}>
      <div className="children-class" style={{ fontStyle: "italic" }}>
        Hello Slot
      </div>
    </Slot.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <Slot className="slot-class" style={{ color: "red" }}>
          <div className="children-class" style={{ fontWeight: "italic" }}>
            Hello Slot
          </div>
        </Slot>`,
      },
    },
  },
};

export const SlotWithEventHandler: Story = {
  render: () => (
    <Slot.Root onClick={() => console.log("Slot Clicked!")}>
      <button onClick={() => console.log("Children Clicked!")}>Click</button>
    </Slot.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `
          <Slot.Root onClick={() => console.log("Slot Clicked!")}>
            <button onClick={() => console.log("Children Clicked!")}>Click</button>
          </Slot.Root>
        `,
      },
    },
  },
};

export const Slottable: Story = {
  render: () => (
    <Slot.Root>
      <span>LEFT ICON - </span>
      <Slot.Slottable>
        <button onClick={() => console.log("button clicked")}>BUTTON</button>
      </Slot.Slottable>
      <span> - RIGHT ICON</span>
    </Slot.Root>
  ),
  parameters: {
    docs: {
      source: {
        code: `
          <Slot>
            <span>LEFT ICON - </span>
            <Slottable>
              <button onClick={() => console.log("button clicked")}>BUTTON</button>
            </Slottable>
            <span> - RIGHT ICON</span>
          </Slot>
        `,
      },
    },
  },
};
