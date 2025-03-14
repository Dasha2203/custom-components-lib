import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Testing Checkbox component', () => {
  test('Should render component', () => {
    render(<Checkbox defaultChecked />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  test('Should be checked', () => {
    render(<Checkbox defaultChecked />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();
  });

  test('Should be unchecked', () => {
    render(<Checkbox defaultChecked={false} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();
  });

  test('Should render label', () => {
    const label = 'Label';
    render(<Checkbox defaultChecked={false} label={label} />);

    const checkbox = screen.getByRole('checkbox');
    const labelEl = screen.getByText(label);

    expect(checkbox).not.toBeChecked();
    expect(labelEl).toBeInTheDocument();
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Checkbox disabled defaultChecked />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  test('Checkbox toggles checked state on click', () => {
    const handleChange = jest.fn();
    let checkedState = false;
    const checkedIconId = 'checked-icon';
    const ariaCheckedAttr = 'aria-checked';

    const { rerender } = render(
      <Checkbox
        checked={checkedState}
        onChange={() => {
          checkedState = !checkedState;
          handleChange();
        }}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox.getAttribute(ariaCheckedAttr)).toBe('false');
    expect(screen.queryByTestId(checkedIconId)).toBeNull();

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);

    rerender(
      <Checkbox checked={checkedState} onChange={() => handleChange()} />
    );

    expect(checkbox.getAttribute(ariaCheckedAttr)).toBe('true');
    expect(screen.queryByTestId(checkedIconId)).not.toBeNull();
  });
});
