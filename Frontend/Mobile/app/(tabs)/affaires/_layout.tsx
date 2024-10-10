import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AffaireLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'affaire' }}
      />
      <Stack.Screen
        name="saleDetail"
        options={{
          headerShown: true,
          title: 'Sale Details',
          headerBackground: () => (
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={{ flex: 1 }}
            />
          ),
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="achatDetail"
        options={{
          headerShown: true,
          title: 'Achat Details',
          headerBackground: () => (
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={{ flex: 1 }}
            />
          ),
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
