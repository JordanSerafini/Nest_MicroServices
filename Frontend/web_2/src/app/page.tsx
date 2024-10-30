"use client";

import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Home: React.FC = () => {
  useEffect(() => {
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    if (welcomeMessage) {
      toast.info(welcomeMessage);

      localStorage.removeItem('welcomeMessage');
    }
  }, []);

  return (
    <div>
      Home
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

    </div>
  );
};

export default Home;