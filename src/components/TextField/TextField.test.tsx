import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TextField from './TextField';

describe('Testing TextField component', () => {
  test('Should render TextField component', () => {
    render(<TextField />);
    expect(screen.getByTestId('text-field')).toBeInTheDocument();
  });

  test('Should contain value to input', () => {
    const value = 'Some value';
    render(<TextField type="text" defaultValue={value} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });

  test('Should set new value to input', async () => {
    const value = 'Some new value';
    render(<TextField type="text" />);
    const input = screen.getByRole('textbox');

    fireEvent.input(input, {
      target: { value },
    });

    expect(input).toBeInTheDocument();
    await waitFor(() => expect(input).toHaveValue(value));
  });

  test('Should contain "disabled" attribute', async () => {
    const initialValue = 'Initial value';
    const newValue = 'Some new value';

    render(<TextField type="text" disabled value={initialValue} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
    expect(input).toHaveValue(initialValue);

    fireEvent.input(input, { target: { value: newValue } });

    await waitFor(() => expect(input).toHaveValue(initialValue));
  });

  test('Should show helper text', () => {
    const helperText = 'Helper text';
    render(<TextField helperText={helperText} />);
    const helperElement = screen.getByText(helperText);

    expect(helperElement).toBeInTheDocument();
  });
});

describe('TextField Snapshots', () => {
  test('Default', () => {
    const { asFragment } = render(<TextField />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('TextField with value and label', () => {
    const { asFragment } = render(
      <TextField defaultValue={'Value'} label={'Label'} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('TextField with error and helperTExt', () => {
    const { asFragment } = render(
      <TextField
        error
        defaultValue={'Value'}
        label={'Label'}
        helperText={'Helper text'}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
