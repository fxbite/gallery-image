import { Dimensions, StyleSheet, Animated } from 'react-native';
import { View, NativeBaseProvider, StatusBar, Image } from 'native-base';
import { RootStackParamList } from '../types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useRef } from 'react';

const { width, height } = Dimensions.get('screen');

const imageW = width * 0.7;
const imageH = imageW * 1.54;

const ListScreen: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <NativeBaseProvider>
      <View flex={1} backgroundColor="#000">
        <StatusBar hidden />
        <View style={StyleSheet.absoluteFillObject}>
          {images?.map((image, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            });
            return (
              <Animated.Image
                key={`image-${index}`}
                source={{ uri: image }}
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
          data={images}
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
                <Image source={{ uri: item }} width={imageW} height={imageH} resizeMode="cover" alt="Item Slider" borderRadius="xl" />
              </View>
            );
          }}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default ListScreen;
