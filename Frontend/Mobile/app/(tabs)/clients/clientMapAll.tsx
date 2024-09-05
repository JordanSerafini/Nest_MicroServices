import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getCustomersCluster } from "../../utils/functions/customer_functions";
import { Customer } from "../../@types/customer.type";

import Icon from "react-native-vector-icons/MaterialIcons";
import Slider from "@react-native-community/slider";

const interpolate = (time: number) => time * 600;


function MapClientScreen() {
  const [customersCoordinates, setCustomersCoordinates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | unknown>(null);
  const [searchLat, setSearchLat] = useState(45.8995);
  const [searchLon, setSearchLon] = useState(6.1286);
  const [rayon, setRayon] = useState(1000);
  const [citySearch, setCitySearch] = useState("");
  const [bannerVisible, setBannerVisible] = useState(false);

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(interpolate(10));
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);


  const handleSliderChange = (value: React.SetStateAction<number>) => {
    setProgress(value);
    setRayon(((value as number) / time) * 1000);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
        getCustomersCluster(searchLat, searchLon, rayon);
    }, 2500);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    getCustomersCluster(searchLat, searchLon, rayon)
      .then((customers: Customer[]) => {
        const coordinates = customers.map((customer) => ({
          latitude: customer.Lat,
          longitude: customer.Lon,
          name: customer.Name,
        }));
        setCustomersCoordinates(coordinates);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [rayon]);

  if (loading) {
    return (
      <View className="z-50 w-screen h-screen">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (customersCoordinates.length === 0) {
    return (
      <View className="z-50 w-screen h-screen">
        <Text>No coordinates available</Text>
      </View>
    );
  }

  return (
    <View className="w-screen h-screen items-center z-50">  
      <View className={`${bannerVisible?" h-24 items-center justify-between ": "h-10 " } w-9.5/10 items-center mb-2 `}>
        {/*----------------------------------------------------------------------- Search input ------------------------------------------------------------------*/}
        <View className={`${bannerVisible? "h-4/10" : "h-full"} w-full flex-row `}>
        <TextInput
          className={`h-full w-9/10 px-2 bg-gray-200`}
          value={citySearch}
          placeholder="Search"
        />
        <Icon name={bannerVisible? "arrow-drop-up" : "arrow-drop-down"} size={32} color="#3B82F6" className="" onPress={()=>setBannerVisible(!bannerVisible)}/>
        </View>
        {/*----------------------------------------------------------------------- Banner ------------------------------------------------------------------*/}
        {bannerVisible && (
          <View className="w-full h-6/10 pt-2">
            <Text>Rayon: {rayon}m</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              value={progress}
              minimumValue={0}
              maximumValue={time}
              minimumTrackTintColor="#3B82F6"
              maximumTrackTintColor="#d3d3d3"
              onValueChange={handleSliderChange}
            />
            
          </View>
        )}
      </View>
      
      
      <MapView
        className="w-9.5/10 h-9/10"
        initialRegion={{
          latitude: searchLat,
          longitude: searchLon,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}
      >
        {customersCoordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            title={coordinate.name}
          />
        ))}
      </MapView>
    </View>
  );
}

export default MapClientScreen;
