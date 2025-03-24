import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

const meta = {
  title: 'Input',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Label = {
  args: {
    label: 'Label',
  },
};

export const Value = {
  args: {
    label: 'Label',
    value: 'Value',
  },
};

export const HelperText = {
  args: {
    label: 'Label',
    value: 'Value',
    helperText: 'Helper text',
  },
};

export const EmptyError = {
  args: {
    label: 'Label',
    error: true,
  },
};

export const ErrorWithValue = {
  args: {
    label: 'Label',
    error: true,
    value: 'Value',
  },
};

export const HelperTextWithError = {
  args: {
    label: 'Label',
    error: true,
    value: 'Value',
    helperText: 'Helper text',
  },
};

export const Disabled = {
  args: {
    label: 'Label',
    value: 'Value',
    disabled: true,
  },
};

export const NumberInput = {
  args: {
    label: 'Label',
    type: 'number',
    value: '5',
  },
};

export const DateInput = {
  args: {
    label: 'Label',
    type: 'date',
    value: '5',
  },
};
