import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import Icon from './Icon';

describe('Icon Component', () => {
  it('renders the icon with the correct type and class', () => {
    const style = { fontSize: '24px' };
    render(<Icon type="home" className="test-class" style={style} />);

    const icon = screen.getByText('home');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('material-symbols-outlined test-class');
    expect(icon).toHaveStyle('font-size: 24px');
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<Icon type="settings" onClick={handleClick} />);

    const icon = screen.getByText('settings');
    fireEvent.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies default black theme when none is provided', () => {
    render(<Icon type="visibility_off" />);
    const icon = screen.getByText('visibility_off');
    expect(icon).toHaveStyle('color: black');
  });

  it('applies the specified theme', () => {
    render(<Icon type="edit" theme="red" />);
    const icon = screen.getByText('edit');
    expect(icon).toHaveStyle('color: red');
  });
});
