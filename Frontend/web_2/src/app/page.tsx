"use client";

import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/home/Dashboard';

const Home: React.FC = () => {
  useEffect(() => {
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    if (welcomeMessage) {
      toast.info(welcomeMessage);

      localStorage.removeItem('welcomeMessage');
    }
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className='h-full w-52'>
        <Dashboard />
      </div>      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        //toastClassName="w-4/5 mx-auto"
      />
    </div>
  );
};

export default Home;
