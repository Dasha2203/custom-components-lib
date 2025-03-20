import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from '../Button/Button';
import { within, userEvent, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is a modal content.</p>
        </Modal>
      </div>
    );
  },
  args: {
    open: false,
  },
};

export const InteractionTest = {
  ...Default,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const openButton = await canvas.getByRole('button', {
      name: /open modal/i,
    });

    await userEvent.click(openButton);
    await expect(
      screen.getByText(/this is a modal content/i)
    ).toBeInTheDocument();

    const overlay = await screen.getByTestId('modal-overlay');
    await userEvent.click(overlay);
    await expect(
      screen.queryByText(/this is a modal content/i)
    ).not.toBeInTheDocument();

    await userEvent.click(openButton);
    await expect(
      screen.getByText(/this is a modal content/i)
    ).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await expect(
      screen.queryByText(/this is a modal content/i)
    ).not.toBeInTheDocument();
  },
};
