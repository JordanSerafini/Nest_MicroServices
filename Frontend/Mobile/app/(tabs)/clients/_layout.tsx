import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Clients' }} />
      <Stack.Screen name="clientList" options={{ headerShown: false, title: 'Client Liste' }} />
      <Stack.Screen
        name="clientDetail"
        options={{ 
          headerShown: true, 
          title: 'Client Details',
          headerStyle: {
            backgroundColor: '#1e3a8a',
          },
          headerTintColor: '#fff', 
        }}
      />
    </Stack>
  );
}
