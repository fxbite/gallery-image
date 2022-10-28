import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeoImage } from '../types';
import { SafeAreaView, StyleSheet, Text, Button, Image, View } from 'react-native';

const PhotoScreen = () => {
  let cameraRef = useRef<any>();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<boolean | undefined>();
  const [hasGeoLocationPermission, setHasGeoLocationPermission] = useState<boolean | undefined>();
  const [photo, setPhoto] = useState<any>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      const geoLocationPermission = await Location.requestForegroundPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
      setHasGeoLocationPermission(geoLocationPermission.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission || !hasMediaLibraryPermission || !hasGeoLocationPermission) {
    return <Text>One of permission for camera, media library and geolocation not granted. Please change this in settings.</Text>;
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current!.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = async () => {
      try {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        const location = await Location.getCurrentPositionAsync();
        const geoImage: GeoImage = {
          imageUrl: 'data:image/jpg;base64,' + photo.base64,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
        const arrayStringValue = await AsyncStorage.getItem('@storage_geoimage');
        if (arrayStringValue !== null) {
          const geoImageArray = JSON.parse(arrayStringValue);
          const updateGeoImageArray = [...geoImageArray, geoImage];
          await AsyncStorage.setItem('@storage_geoimage', JSON.stringify(updateGeoImageArray));
        } else {
          let geoImageArray: GeoImage[] = [];
          geoImageArray.push(geoImage);
          await AsyncStorage.setItem('@storage_geoimage', JSON.stringify(geoImageArray));
        }
        setPhoto(undefined);
        return alert('Saved');
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: 'data:image/jpg;base64,' + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});

export default PhotoScreen;
