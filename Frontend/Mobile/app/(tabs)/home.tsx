import React from 'react';
import { View } from 'react-native';

import Dashboard from '../components/home/Dashboard';
import MainHome from '../components/home/MainHome';

const HomeScreen: React.FC = () => {

  return (
    <View className='h-screen w-screen items-center justify-start'>
      <Dashboard />
      <MainHome/>
    </View>
  );
};



export default HomeScreen;
