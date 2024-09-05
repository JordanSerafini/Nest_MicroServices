import { render, screen } from '@testing-library/react';
import Loader from './Loader'; 

import '@testing-library/jest-dom';


describe('Loader Component', () => {
  it('should render without crashing', () => {
    render(<Loader />);
    expect(screen.getByRole('button', { name: /chargement\.\.\./i })).toBeInTheDocument();
  });

  it('should be disabled', () => {
    render(<Loader />);
    expect(screen.getByRole('button', { name: /chargement\.\.\./i })).toBeDisabled();
  });

  it('should accept custom CSS classes', () => {
    const customCss = 'bg-red-500';
    render(<Loader css={customCss} />);
    expect(screen.getByRole('button', { name: /chargement\.\.\./i })).toHaveClass(customCss);
  });
});
