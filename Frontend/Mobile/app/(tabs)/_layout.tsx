import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { GlobalProvider } from '../context/GlobalContext';

export default function TabLayout() {

  return (
    <GlobalProvider>
    <Tabs screenOptions={{ tabBarActiveTintColor: '#1e40af', headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color}) => <FontAwesome size={28} name="home" color={color} className='p-9'/>,
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: 'Clients',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: 'Items',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chantier"
        options={{
          title: 'Chantier',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="building" color={color} />,
        }}
      />
    </Tabs>
    </GlobalProvider>
  );
}
