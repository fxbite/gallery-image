import React, { useState, useEffect } from 'react';
import { View, Text, NativeBaseProvider } from 'native-base';
import * as Location from 'expo-location';

const GeoListScreen = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('Permission Successfully');
      } else {
        console.log('Permission not granted');
      }
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();
  }, []);

  return (
    <NativeBaseProvider>
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>dassasadsadasdas</Text>
        <Text>{JSON.stringify(location)}</Text>
      </View>
    </NativeBaseProvider>
  );
};

export default GeoListScreen;
