import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Testing Modal component', () => {
  let handleClose: jest.Mock;

  beforeEach(() => {
    handleClose = jest.fn();
  });

  test('modal renders in the portal', () => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'react-portal-wrapper');
    document.body.appendChild(modalRoot);

    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );

    const modalElement = screen.getByTestId('modal-overlay');
    expect(modalElement).toBeInTheDocument();
    expect(modalRoot.contains(modalElement));
    expect(screen.getByText('Modal Content')).toBeInTheDocument();

    document.body.removeChild(modalRoot);
  });

  test('closes when clicking outside the modal', () => {
    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('closes when pressing Escape', () => {
    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

describe('Snapshots of Modal', () => {
  let modalRoot: HTMLElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'react-portal-wrapper');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    document.body.removeChild(modalRoot);
  });

  test('Opened modal', async () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <p>Modal content</p>
      </Modal>
    );

    const modalComponent = screen.getByTestId('modal-overlay');
    expect(modalComponent).toMatchSnapshot();
  });
});
