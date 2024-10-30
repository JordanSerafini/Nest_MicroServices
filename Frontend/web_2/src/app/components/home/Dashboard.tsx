import React from 'react';
import { UserGroupIcon, ShoppingBagIcon, ChatIcon, BellIcon, CreditCardIcon, CogIcon } from '@heroicons/react/outline'; 
import { HomeIcon, ClipboardCheckIcon, DocumentTextIcon } from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-50 p-6 flex flex-col justify-between border-r border-gray-200">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Solution Logique</h1>
        
        {/* Menu Section */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs uppercase mb-4">Menu</p>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <ClipboardCheckIcon className="w-5 h-5 mr-3" />
              Planing
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <DocumentTextIcon className="w-5 h-5 mr-3" />
              Articles
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <UserGroupIcon className="w-5 h-5 mr-3" />
              Clients
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <ShoppingBagIcon className="w-5 h-5 mr-3" />
              Documents
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <ChatIcon className="w-5 h-5 mr-3" />
              Messages
              <span className="ml-auto bg-black text-white text-xs px-2 rounded-full">23</span>
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <BellIcon className="w-5 h-5 mr-3" />
              Notification
            </li>
          </ul>
        </div>

        {/* Account Section */}
        <div className="mb-8">
          <p className="text-gray-500 text-xs uppercase mb-4">Account</p>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <CreditCardIcon className="w-5 h-5 mr-3" />
              Credit Report
            </li>
            <li className="flex items-center text-gray-600 hover:text-black cursor-pointer">
              <CogIcon className="w-5 h-5 mr-3" />
              Settings
            </li>
          </ul>
        </div>
      </div>

      {/* Upgrade to Pro Button */}
      <div className="flex flex-col items-center">
        {/*<img src="/path-to-your-image/rocket.png" alt="Rocket" className="w-12 h-12 mb-4" />*/}
        <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
