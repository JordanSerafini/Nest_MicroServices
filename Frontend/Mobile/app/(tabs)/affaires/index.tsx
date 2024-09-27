import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SalesList from './salesList';


export default function AffairePage() {
  const [content, setContent] = useState<React.ReactNode>(null);


  const handleSalesPress = () => {
    setContent(<SalesList />);
};


  return (
    <SafeAreaView className='w-screen h-screen justify-start'>
      {!content ? (

     <View className='gap-10'>
        <TouchableOpacity onPress={handleSalesPress}>
          <Text>Liste des ventes</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Liste des affaires</Text>
        </TouchableOpacity>

     </View>
      ) : (
        <View className='w-screen h-screen justify-start'>
          {content}
        </View>
      )}
    </SafeAreaView>
  );
}