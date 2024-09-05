import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface Notification {
  title: string;
  description: string;
  type: string;
  start: string;
  end: string;
  startHour: string;
  endHour: string;
}

interface NotificationProps {
  notifications: Notification[];
}

const NotificationComponent: React.FC<NotificationProps> = ({ notifications }) => {
  return (
    <FlatList
      data={notifications}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View className="h-32 w-72 bg-white rounded-lg shadow m-2 justify-evenly px-2">
          <Text className="text-lg font-bold text-blue-800" >{item.title}</Text>
          <Text>{item.description}</Text>
          <Text className='text-green-800 self-end'>
            {item.startHour} - {item.endHour} {item.start}
          </Text>
        </View>
      )}
    />
  );
};

export default NotificationComponent;
