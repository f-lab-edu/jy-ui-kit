import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";

import { CheckboxIndicator } from "./indicator";
import { Checkbox } from "./root";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: {
      control: "radio",
      options: [undefined, false, true, "indeterminate"],
      table: {
        defaultValue: { summary: "undefined" },
        type: { summary: "boolean | 'indeterminate'" },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  parameters: {
    controls: {
      exclude: /(on(?!CheckedChange)\w*)/,
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <>
      <Checkbox {...args} id="my-checkbox" onCheckedChange={(state) => console.log(state)}>
        <CheckboxIndicator>
          {(state) => {
            return state === "indeterminate" ? <MinusIcon /> : <CheckIcon />;
          }}
        </CheckboxIndicator>
      </Checkbox>
      <label htmlFor="my-checkbox">Checkbox Label</label>
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <>
          <Checkbox {...args}>
            <CheckboxIndicator>
              {(state) => {
                return state === "indeterminate" ? <MinusIcon /> : <CheckIcon />;
              }}
            </CheckboxIndicator>
          </Checkbox>
          <label htmlFor="my-checkbox">Checkbox Label</label>
        </>
        `,
      },
    },
  },
};

export const Default: Story = {
  ...Template,
  args: {
    disabled: false,
    checked: undefined,
  },
};

export const Checked: Story = {
  ...Template,
  args: {
    ...Default.args,
    checked: true,
  },
};

export const Indeterminate: Story = {
  ...Template,
  args: {
    ...Default.args,
    checked: "indeterminate",
  },
};
