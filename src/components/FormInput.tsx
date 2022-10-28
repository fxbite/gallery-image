import { FormControl, Input, Stack, Text, Box, Center, Button, KeyboardAvoidingView } from 'native-base';
import { Platform } from 'react-native';
import { useState, useEffect } from 'react';
import validUrl from 'valid-url';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';

type ListProps = BottomTabNavigationProp<RootStackParamList, 'List'>;

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200'
  // 'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  // 'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  // 'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  // 'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  // 'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'
];

const FormInput = () => {
  const [link, setLink] = useState('');
  const [image, setImage] = useState(data);
  const navigation = useNavigation<ListProps>();
  const handleAddLink = () => {
    if (!link) {
      return alert(`Required Input`);
    }
    if (!validUrl.isUri(link)) {
      return alert(`Invalid Link`);
    }
    setImage((prevArr) => [...prevArr, link]);
    setLink('')
    return alert('Submitted Link');
  };
  useEffect(() => {
    navigation.navigate('List', { link: image });
  });

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
              <Input onChangeText={(text) => setLink(text)} />
              <Button mt="3" onPress={handleAddLink} colorScheme="indigo">
                Add Link
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default FormInput;
