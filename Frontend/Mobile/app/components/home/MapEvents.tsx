import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Event {
  title: string;
  description: string;
  type: string;
  start: string;
  end: string;
  startHour: string;
  endHour: string;
  address: string;
  zipCode: string;
  city: string;
  lon: number;
  lat: number;
}

interface MapEventProps {
  events: Event[];
}

const MapEvent: React.FC<MapEventProps> = ({ events }) => {
  return (
      <MapView
        style={{ width: "100%", height: 150, marginBottom: 20 }}
        initialRegion={{
          latitude: 45.8992,
          longitude: 6.1294,
          latitudeDelta: 0.05, 
          longitudeDelta: 0.05, 
        }}
      >
        {events.map((event, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: event.lat, longitude: event.lon }}
            title={event.title}
            description={event.description}
          />
        ))}
      </MapView>
  );
};

export default MapEvent;
