import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BottomNav from './BottomNav';
import { BrowserRouter } from 'react-router-dom';

// Mock de useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('BottomNav', () => {
    it('toggles showMenu state when menu icon is clicked', () => {
      render(
        <BrowserRouter>
          <BottomNav />
        </BrowserRouter>
      );
      const menuButton = screen.getByLabelText('Menu');
      fireEvent.click(menuButton);
  
      // Vérifie si un élément spécifique du NavMenu est visible après le clic
      expect(screen.getByText('Accueil')).toBeInTheDocument();
  
      // Clique à nouveau pour fermer le menu
      fireEvent.click(menuButton);
  
      // Utilise `queryByText` pour vérifier que l'élément n'est plus visible
      expect(screen.queryByText('Accueil')).not.toBeInTheDocument();
    });
  });
