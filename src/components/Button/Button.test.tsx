import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Test button', () => {
  test('Should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('should execute onClick function', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Should show disabled button', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('Disabled button shouldn`t execute onclick method', () => {
    const handleClick = jest.fn();
    render(<Button disabled>Click</Button>);
    fireEvent.click(screen.getByText('Click'));

    expect(screen.getByRole('button')).toBeDisabled();
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('Contained Button snapshot', () => {
    const { asFragment } = render(<Button>Click me</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Outlined Button snapshot', () => {
    const { asFragment } = render(<Button variant="outlined">Click me</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Text Button snapshot', () => {
    const { asFragment } = render(<Button variant="text">Click me</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should contain class for contained button', () => {
    render(<Button variant="contained">Click me</Button>);
    const button = screen.getByText('Click me');

    expect(button).toHaveClass('button_contained');
  });

  it('Should contain class for outlined button', () => {
    render(<Button variant="outlined">Click me</Button>);
    const button = screen.getByText('Click me');

    expect(button).toHaveClass('button_outlined');
    expect(button).toHaveClass('button');
  });

  it('Should contain class for text button', () => {
    render(<Button variant="text">Click me</Button>);
    const button = screen.getByText('Click me');

    expect(button).toHaveClass('button_text');
    expect(button).toHaveClass('button');
  });

  it('should apply additional className prop', () => {
    render(<Button className="extra-class">Click me</Button>);
    const button = screen.getByText('Click me');

    expect(button).toHaveClass('extra-class');
  });

  it('should render an anchor tag when href is provided', () => {
    render(<Button href="https://example.com">Click me</Button>);
    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('should render button with the correct variant and size classes', () => {
    render(
      <Button variant="outlined" size="small">
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button).toHaveClass('button_outlined');
    expect(button).toHaveClass('button_small');
    expect(button).toHaveClass('button');
  });
});
