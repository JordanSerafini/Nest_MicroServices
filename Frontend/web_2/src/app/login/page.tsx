// app/login/page.tsx

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../utils/functions/auth.function';
import Image from 'next/image';
import Cookies from 'js-cookie';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('jordan@solution-logique.fr');
  const [password, setPassword] = useState<string>('pass123');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    try {
      const data = await login(email, password);
      console.log(data);

      if (!data.access_token) {
        setErrorMessage(data.message || "Échec de la connexion. Vérifiez vos identifiants.");
        return;
      }

      // Stocke le token et l'utilisateur dans les cookies
      Cookies.set('token', data.access_token, { expires: 1000, sameSite: 'Strict' });
      Cookies.set('user', JSON.stringify(data.user), { expires: 1000, sameSite: 'Strict' });

      router.push('/'); // Redirection après connexion réussie
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Colonne gauche pour le logo et le texte */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 w-1/2 p-8 text-white">
        <Image
          src="/SLIlogo.png" // Assurez-vous que le chemin est correct
          alt="Logo"
          width={128}
          height={128}
          className="rounded-full mb-4"
        />
        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>

      {/* Colonne droite pour le formulaire de connexion */}
      <div className="flex items-center justify-center w-1/2 bg-white p-8">
        <div className="w-full max-w-sm">
          {errorMessage && (
            <p className="mb-4 text-center text-red-600 text-xs font-bold">
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={3}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
