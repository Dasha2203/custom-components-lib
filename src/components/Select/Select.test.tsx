import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Select from './Select';
import MenuItem from './MenuItem/MenuItem';

describe('Testing Select component', () => {
  const selectId = 'select';
  const dropdownId = 'select-dropdown';

  test('Should render component', () => {
    render(<Select />);
    const select = screen.getByRole('combobox', { hidden: true });

    expect(select).toBeInTheDocument();
  });

  test('Should show label', () => {
    const label = 'Age';
    render(<Select label="Age" />);
    const labelEl = screen.getAllByText(label);

    expect(labelEl[0]).toBeInTheDocument();
  });

  test('Should show dropdown list after clicking by select element', () => {
    const label = 'Age';
    render(
      <Select label={label} value={10}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    );

    const select = screen.getByTestId(selectId);
    fireEvent.click(select);

    waitFor(() => {
      const dropdownEl = screen.getByTestId(dropdownId);

      expect(dropdownEl).toBeInTheDocument();
    });
  });

  test('Should select event work correctly', async () => {
    const handleChange = jest.fn();

    const { getByRole, findByTestId, rerender } = render(
      <Select label="Age" value={''} onChange={handleChange}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    );

    const select = getByRole('combobox', { hidden: true });
    fireEvent.focus(select);

    const dropdownEl = await findByTestId('select-dropdown');
    expect(dropdownEl).toBeInTheDocument();

    const option = dropdownEl.querySelector('li[value="10"]');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith(10);
    rerender(
      <Select label="Age" value={'10'} onChange={handleChange}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    );

    await waitFor(() => {
      expect(select).toHaveTextContent('10');
    });
  });

  test('Should not show dropdown list when passed disable property', () => {
    const label = 'Age';
    render(
      <Select label={label} value={10} disabled>
        <MenuItem value={10} data-testid={'option-10'}>
          10
        </MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    );

    const select = screen.getByTestId('select');
    fireEvent.click(select);

    waitFor(() => {
      const dropdownEl = screen.queryByTestId('select-dropdown');

      expect(dropdownEl).not.toBeInTheDocument();
    });
  });
});

describe('Select snapshots', () => {
  const label = 'Age';
  const selectId = 'select';

  test('select element', async () => {
    render(
      <Select label={label}>
        <MenuItem value={10} data-testid={'option-10'}>
          10
        </MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    );

    const select = screen.getByTestId(selectId);
    expect(select).toMatchSnapshot();
  });

  test('dropdown list', async () => {
    const { getByRole, findByTestId } = render(
      <Select label={label}>
        <MenuItem value={10} data-testid={'option-10'}>
          10
        </MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
    );

    const select = getByRole('combobox', { hidden: true });
    fireEvent.focus(select);

    const dropdownEl = await findByTestId('select-dropdown');
    expect(dropdownEl).toMatchSnapshot();
  });
});
