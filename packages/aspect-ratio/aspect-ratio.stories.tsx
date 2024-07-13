import * as AspectRatio from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio.Root,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number", min: 0, max: 1, step: 0.01 },
      table: {
        defaultValue: { summary: "1" },
      },
    },
  },
} satisfies Meta<typeof AspectRatio.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ boxSizing: "border-box", width: "300px", border: "1px solid black" }}>
      <AspectRatio.Root {...args}>
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?w=300&dpr=2&q=80"
          alt="Landscape photograph by Tobias Tullius"
        />
      </AspectRatio.Root>
    </div>
  ),
  args: {
    ratio: 1,
  },
};
