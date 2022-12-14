import Reacr, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, NativeBaseProvider } from 'native-base';
import MapView, { Marker, Circle } from 'react-native-maps';
import { LocationInfo, RootStackParamList } from '../types';
import { useIsFocused, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GeoListScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<RootStackParamList, 'GeoList'>>();
  const [title, setTitle] = useState('University of Greenwich');
  const [description, setDescription] = useState('Mobile Deadline is here π­');
  const [geoLocation, setGeoLocation] = useState<LocationInfo>({
    latitude: 10.803361559442301,
    longitude: 106.65274405520121,
    marker: {
      latitude: 10.803361559442301,
      longitude: 106.65274405520121
    }
  });

  useEffect(() => {
    (async () => {
      const geoImageString = await AsyncStorage.getItem('@storage_geoimage');
      if (geoImageString !== null) {
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
          setTitle('Location that you have taken the photo');
          setDescription('πΈπΈπΈπΈπΈπΈπΈ');
        }
      } else {
        setGeoLocation({
          latitude: 10.803361559442301,
          longitude: 106.65274405520121,
          marker: {
            latitude: 10.803361559442301,
            longitude: 106.65274405520121
          }
        });
        setTitle('University of Greenwich');
        setDescription('Mobile Deadline is here π­');
      }
    })();
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
