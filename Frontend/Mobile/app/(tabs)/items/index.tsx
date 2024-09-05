import { router, useRouter, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import FabItem from './FAB/FabItem';
import StockDocumentList from './StockDocumentList';
import ItemList from './itemList';
import HomeItem from './HomeItem'; // Import du nouveau composant

const IndexScreen: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>(null);
  const segments = useSegments(); 

  const itemClick = () => {
    setContent(<ItemList />);
  };

  const stockClick = () => {
    setContent(<StockDocumentList />);
  };

  useEffect(() => {
    setContent(null);
  }, [segments]);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1e40af',
      secondary: '#BFDBFE',
      accent: '#1E3A8A',
    },
  };

  return (
    <PaperProvider theme={theme}>
      {!content ? (
        <HomeItem onItemClick={itemClick} onStockClick={stockClick} /> 
      ) : (
        <SafeAreaView style={styles.container}>
          {content}
        </SafeAreaView>
      )}
      <FabItem
            showAddModal={() => {}}
            showEditItemModal={() => {}}
            showAddItemModal={() => {}}
          />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IndexScreen;
