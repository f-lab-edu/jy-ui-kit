import * as Switch from "./index";

import type { Meta, StoryObj } from "@storybook/react/*";

const meta = {
  title: "Components/Switch",
  component: Switch.Root,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "radio",
      options: [undefined, false, true],
    },
  },
} satisfies Meta<typeof Switch.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Switch.Root {...args}>
      <Switch.Thumb />
    </Switch.Root>
  ),
  args: {
    defaultChecked: false,
    readOnly: false,
    invalid: false,
    required: false,
  },
};
