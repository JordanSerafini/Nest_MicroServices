import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function CalendarPage() {
  const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        setCalendars(calendars);
      }
    })();
  }, []);


  return (
    <View style={styles.container}>

      <View style={styles.topContainer}>
        {calendars.map(calendar => (
          <Text key={calendar.id}>{calendar.title}</Text>
        ))}
        <Button title="Create a new calendar" onPress={createCalendar} />
      </View>

      <View style={styles.bottomContainer}>
        <Text>Empty Container</Text>
      </View>
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource: Calendar.Source = Platform.OS === 'ios'
    ? await getDefaultCalendarSource()
    : { type: 'local', isLocalAccount: true, name: 'Expo Calendar', id: '' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
