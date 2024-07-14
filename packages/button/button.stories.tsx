import { Button } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Button {...args} onClick={() => console.log("clicked")}>
      Normal Button
    </Button>
  ),
  args: {
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
          <Button onClick={() => console.log("clicked")}>
            Normal Button
          </Button>
        `,
      },
    },
  },
};

export const LinkButton: Story = {
  render: () => (
    <Button asChild>
      <a role="link" href="/">
        Link Button
      </a>
    </Button>
  ),
  argTypes: { disabled: { table: { disable: true } } },
  parameters: {
    docs: {
      source: {
        code: `
          <Button asChild>
            <a role="link" href="/">
              Link Button
            </a>
          </Button>
        `,
      },
    },
  },
};
