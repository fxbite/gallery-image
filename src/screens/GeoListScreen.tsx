import Reacr, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, NativeBaseProvider } from 'native-base';
import MapView, { Marker, Circle } from 'react-native-maps';
import { LocationInfo, RootStackParamList } from '../types';
import { useIsFocused, useRoute, RouteProp } from '@react-navigation/native';

const GeoListScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<RootStackParamList, 'GeoList'>>();
  const [title, setTitle] = useState('University of Greenwich')
  const [description, setDescription] = useState('Mobile Deadline is here 😭')
  const [geoLocation, setGeoLocation] = useState<LocationInfo>({
    latitude: 10.803361559442301,
    longitude: 106.65274405520121,
    marker: {
      latitude: 10.803361559442301,
      longitude: 106.65274405520121
    }
  });

  useEffect(() => {
    const photoLocationImage = route.params?.locationInfo;
    if (photoLocationImage?.latitude && photoLocationImage?.longitude) {
      setGeoLocation({
        latitude: photoLocationImage?.latitude,
        longitude: photoLocationImage.longitude,
        marker: {
          latitude: photoLocationImage?.latitude,
          longitude: photoLocationImage.longitude
        }
      });
      setTitle('Location that you have taken the photo')
      setDescription('📸📸📸📸📸📸📸')
    }
  }, [isFocused]);

  return (
    <NativeBaseProvider>
      <View flex={1} backgroundColor="#fff" alignContent="center" justifyContent="center">
        <MapView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          showsCompass={true}
          region={{
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.0005
          }}
        >
          <Marker coordinate={geoLocation.marker} title={title} description={description} />
          <Circle center={{ latitude: geoLocation.latitude, longitude: geoLocation.longitude }} radius={100} />
        </MapView>
      </View>
    </NativeBaseProvider>
  );
};

export default GeoListScreen;
