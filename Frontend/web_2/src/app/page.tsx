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
    <div className="w-screen h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
      <div className='h-screen w-52'>
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
