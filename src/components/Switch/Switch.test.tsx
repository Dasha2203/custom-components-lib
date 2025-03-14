import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Switch from './Switch';

describe('Testing Switch', () => {
  test('Should render Switch component', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).toBeInTheDocument();
  });

  test('Should be checked', () => {
    render(<Switch checked={true} />);
    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).toBeChecked();
  });

  test('Should be unchecked', () => {
    render(<Switch checked={false} />);
    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).not.toBeChecked();
  });

  test('Should be disabled', async () => {
    render(<Switch checked={false} disabled />);
    const switchElement = screen.getByRole('checkbox');

    expect(switchElement).toBeDisabled();
  });
});

describe('Snapshots of Switch', () => {
  test('Checked Switch', () => {
    const { asFragment } = render(<Switch checked={true} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Unchecked Switch', () => {
    const { asFragment } = render(<Switch checked={false} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Disabled checked Switch', () => {
    const { asFragment } = render(<Switch checked={true} disabled />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Disabled unchecked Switch', () => {
    const { asFragment } = render(<Switch checked={false} disabled />);

    expect(asFragment()).toMatchSnapshot();
  });
});
