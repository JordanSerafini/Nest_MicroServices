import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import Articles from './Articles';

describe('Articles page', () => {
  beforeEach(() => {
    render(<Articles />);
  });

  test('should display item details when an item is clicked', async () => {
    const item = await screen.findByText(/Sample Article Caption/i);
    fireEvent.click(item);
    expect(await screen.findByText(/Sample Article Description/i)).toBeInTheDocument();
  });

  test('should handle search query with special characters', async () => {
    const searchInput = screen.getByPlaceholderText('Recherche...');
    fireEvent.change(searchInput, { target: { value: 'test@' } });
    expect(await screen.findByText(/Caractères spéciaux non autorisés/i)).toBeInTheDocument();
  });

  test('should display item details when expanded', async () => {
    const item = await screen.findByText(/Sample Article Caption/i);
    fireEvent.click(item);
    expect(await screen.findByText(/Fournisseur: Sample Supplier/i)).toBeInTheDocument();
  });

  test('should filter items by family', async () => {
    const familyInput = screen.getByPlaceholderText('famille');
    fireEvent.change(familyInput, { target: { value: 'AV' } });
    expect(await screen.findByText(/Article in Family AV/i)).toBeInTheDocument();
  });
});
