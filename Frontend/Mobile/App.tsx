import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { GlobalProvider } from './app/context/GlobalContext';
import AppNavigationContainer from './NavigationContainer';
import MenuWrapper from './app/components/menu/MenuWrapper'; 

const App = () => {

  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <PaperProvider>
          <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
          <View style={styles.container}>
            <AppNavigationContainer />
          </View>
          <MenuWrapper />
        </PaperProvider>
      </GlobalProvider>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
