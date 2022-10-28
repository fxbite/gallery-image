import { Dimensions, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { View, NativeBaseProvider, StatusBar, Image } from 'native-base';
import { GeoImage, RootStackParamList } from '../types';
import { useRef, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation, NavigationProp } from '@react-navigation/native';

const ListScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'GeoList'>>();
  const { width, height } = Dimensions.get('screen');

  const imageW = width * 0.7;
  const imageH = imageW * 1.54;
  const data: GeoImage[] = [
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200'
    },
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200'
    },
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200'
    },
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200'
    },
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200'
    },
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200'
    },
    {
      imageUrl: 'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'
    }
  ];
  const [geoImage, setGeoImage] = useState(data);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const geoImageString = await AsyncStorage.getItem('@storage_geoimage');
      if (geoImageString !== null) {
        const geoImageArray: GeoImage[] = JSON.parse(geoImageString);
        setGeoImage(data.concat(geoImageArray));
      } else {
        setGeoImage(data);
      }
    })();
  }, [isFocused]);

  const showLocationPhoto = (latitude: number | undefined, longitude: number | undefined) => () => {
    if (latitude && longitude) {
      navigation.navigate('GeoList', {
        locationInfo: {
          latitude: latitude,
          longitude: longitude
        }
      });
    } else {
      alert('No GPS Found');
    }
  };

  return (
    <NativeBaseProvider>
      <View flex={1} backgroundColor="#000">
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFillObject}>
          {geoImage?.map((image, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            });
            return (
              <Animated.Image
                key={`image-${index}`}
                source={{ uri: image.imageUrl }}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    opacity
                  }
                ]}
                blurRadius={50}
              />
            );
          })}
        </View>
        <Animated.FlatList
          data={geoImage}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          renderItem={({ item }) => {
            return (
              <View
                width={width}
                justifyContent="center"
                alignItems="center"
                style={{
                  shadowColor: '#000',
                  shadowOpacity: 1,
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowRadius: 20
                }}
              >
                <TouchableOpacity activeOpacity={0.5} onPress={showLocationPhoto(item.latitude, item.longitude)}>
                  <Image source={{ uri: item.imageUrl }} width={imageW} height={imageH} resizeMode="cover" alt="Item Slider" borderRadius="xl" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default ListScreen;
