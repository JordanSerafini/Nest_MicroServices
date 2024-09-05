import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/login/Login'; // Ajustez le chemin selon votre structure de dossier

describe('Login', () => {
  it('should update email and password input values', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Récupérer les champs d'entrée
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    // Vérifier que les champs d'entrée sont vides par défaut
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    // Simuler la saisie de l'utilisateur
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Vérifier que les champs d'entrée sont mis à jour avec les nouvelles valeurs
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password');
  });
  
/*
  it('should display an error message when the form is submitted with empty fields or if one field is missing', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /Connexion/i });

    // Test with both fields empty
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Veuillez remplir tous les champs/i)).toBeInTheDocument();
    });

    // Test with email field filled and password field empty
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Veuillez remplir tous les champs/i)).toBeInTheDocument();
    });

    // Test with password field filled and email field empty
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Veuillez remplir tous les champs/i)).toBeInTheDocument();
    });
  });
  */
});
