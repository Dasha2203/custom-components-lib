import type { Meta, StoryObj } from '@storybook/react';

import Switch from './Switch';

const meta = {
  title: 'Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: {
    checked: false,
  },
};

export const On: Story = {
  args: {
    checked: true,
  },
};

export const LockedOn: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const LockedOff: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};
