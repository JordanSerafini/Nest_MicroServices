"use client";

import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './home/Dashboard';

const Home: React.FC = () => {
  useEffect(() => {
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    if (welcomeMessage) {
      toast.info(welcomeMessage);
      localStorage.removeItem('welcomeMessage');
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col overflow-hidden">
      <Dashboard />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Home;
