import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { ButtonColor, ButtonVariant } from './types';

export const ActionsData = {
  onClick: action('button-click'),
};

const meta = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultArgs = {
  children: 'Click Me',
};

const createButtonStory = (variant: ButtonVariant, color?: ButtonColor) => {
  return {
    args: {
      ...DefaultArgs,
      variant,
      color,
    },
  };
};

export const Contained: Story = createButtonStory('contained', 'primary');
export const SecondaryContained: Story = createButtonStory(
  'contained',
  'secondary'
);
export const SuccessContained: Story = createButtonStory(
  'contained',
  'success'
);
export const ErrorContained: Story = createButtonStory('contained', 'error');
export const DisabledContained: Story = {
  args: {
    ...createButtonStory('contained', 'error').args,
    disabled: true,
  },
};

export const Outlined: Story = createButtonStory('outlined', 'primary');
export const SecondaryOutlined: Story = createButtonStory(
  'outlined',
  'secondary'
);
export const SuccessOutlined: Story = createButtonStory('outlined', 'success');
export const ErrorOutlined: Story = createButtonStory('outlined', 'error');
export const DisabledOutlined: Story = {
  args: {
    ...createButtonStory('outlined', 'error').args,
    disabled: true,
  },
};

export const Text: Story = createButtonStory('text', 'primary');
export const SecondaryText: Story = createButtonStory('text', 'secondary');
export const SuccessText: Story = createButtonStory('text', 'success');
export const ErrorText: Story = createButtonStory('text', 'error');
export const DisabledText: Story = {
  args: {
    ...createButtonStory('text', 'error').args,
    disabled: true,
  },
};
