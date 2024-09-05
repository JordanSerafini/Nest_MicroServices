import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badges from './Badges';

describe('Badges Component', () => {
  it('renders correctly with required props', () => {
    render(<Badges title="EBP" color="bg-red-500" />);
    const badgeElement = screen.getByText('EBP');
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveClass('bg-red-500');
  });

  it('applies additional CSS classes', () => {
    const additionalCSS = 'mt-2';
    render(<Badges title="Map" color="bg-green-500" css={additionalCSS} />);
    const badgeElement = screen.getByText('Map');
    expect(badgeElement).toHaveClass('bg-green-500', 'mt-2');
  });

  it('displays the correct title', () => {
    render(<Badges title="Settings" color="bg-blue-500" />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
