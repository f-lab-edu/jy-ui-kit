import { AvatarFallback } from "./fallback";
import { AvatarImage } from "./image";
import { Avatar } from "./root";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    onImageLoadingStatusChange: {
      table: {
        category: "AvatarImage",
        type: { summary: "(status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR') => void" },
      },
    },
  },
} satisfies Meta<typeof Avatar | typeof AvatarImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?img=3" />
      <AvatarFallback>Fall Back</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage />
      <AvatarFallback>
        <img src="https://i.pravatar.cc/150?img=4" />
      </AvatarFallback>
    </Avatar>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150" />
      <AvatarFallback>
        {(status) => {
          if (status === "LOADING") {
            return <div>LOADING</div>;
          } else if (status === "ERROR") {
            return <span>ERROR</span>;
          }
          return null;
        }}
      </AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      source: {
        code: `
          <Avatar {...args}>
            <AvatarImage src="https://i.pravatar.cc/150" />
            <AvatarFallback>
              {(status) => {
                if (status === "LOADING") {
                  return <div>LOADING</div>;
                } else if (status === "ERROR") {
                  return <span>ERROR</span>;
                }
                return null;
              }}
            </AvatarFallback>
          </Avatar>
        `,
      },
    },
  },
};
