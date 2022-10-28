import { FormControl, Input, Stack, Text, Box, Center, Button, KeyboardAvoidingView } from 'native-base';
import { Platform } from 'react-native';
import React, { useState } from 'react';
import validUrl from 'valid-url';
import { GeoImage } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormInput: React.FC = () => {
  const [link, setLink] = useState('');
  const handleAddLink = async () => {
    if (!link) {
      return alert(`Required Input`);
    }
    if (!validUrl.isUri(link)) {
      return alert(`Invalid Link`);
    }
    const geoImage: GeoImage = {
      imageUrl: link
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
    setLink('');
    return alert('Submitted Link');
  };

  const removeAllGeoImage = async () => {
    await AsyncStorage.removeItem('@storage_geoimage');
    return alert('OK');
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: '400px',
        lg: 'auto'
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center w="100%" flex={1}>
        <Stack
          space={2.5}
          alignSelf="center"
          px="4"
          safeArea
          mt="4"
          w={{
            base: '100%',
            md: '25%'
          }}
        >
          <Box>
            <Text bold fontSize="xl" mb="4">
              Upload your photo
            </Text>
            <FormControl mb="5">
              <FormControl.Label>URL Image</FormControl.Label>
              <Input onChangeText={(text) => setLink(text)} value={link} />
              <Button mt="3" onPress={handleAddLink} colorScheme="indigo">
                Add Link
              </Button>
              <Button mt="3" onPress={removeAllGeoImage}>
                Wipe Out
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default FormInput;
