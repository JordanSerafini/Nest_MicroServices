// app/login/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../utils/functions/auth.function';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../components/UI/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('jordan@solution-logique.fr');
  const [password, setPassword] = useState<string>('pass123');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  // Afficher les notifications en fonction de l'état de redirection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message === 'not_logged_in') {
      toast.info('Vous devez être connecté pour accéder à cette page');
    } else if (message === 'token_expired') {
      toast.error('Votre jeton de connexion a expiré, veuillez vous reconnecter');
    }
  }, []);
  

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
  
      Cookies.set('token', data.access_token, { expires: 1000, sameSite: 'Strict' });
      Cookies.set('user', JSON.stringify(data.user), { expires: 1000, sameSite: 'Strict' });
      localStorage.setItem('welcomeMessage', `Bonjour ${data.user.prenom} ${data.user.nom}, bienvenue dans votre espace EBP.`);

      router.push('/');
  
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage("Échec de la connexion. Vérifiez vos identifiants.");
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Colonne gauche pour le logo et le texte */}
      <div className="flex flex-col items-center justify-center w-1/2 p-8 text-white gradient-active">
        <Image
          src="/SLIlogo.png" // Assurez-vous que le chemin est correct
          alt="Logo"
          width={328}
          height={328}
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
          <form >
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={3}
              />
            </div>
            <Button name="Connexion" onClick={handleSubmit} type="submit" style='gradient' />
            </form>
        </div>
      </div>

      {/* Conteneur pour les notifications toast */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
