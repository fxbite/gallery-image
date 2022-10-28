import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';
import { RootStackParamList } from '../types';

import FormScreen from '../screens/FormScreen';
import ListScreen from '../screens/ListScreen';
import PhotoScreen from '../screens/PhotoScreen';
import GeoListScreen from '../screens/GeoListScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          height: 60,
          backgroundColor: '#f2e3d1',
          borderRadius: 10
        },
        headerShown: false
      }}
      // initialRouteName="Form"
    >
      <Tab.Screen
        name="Form"
        component={FormScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../../assets/file-arrow-up-solid.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#b25829' : '#93877b'
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../../assets/list-ul-solid.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#b25829' : '#93877b'
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Photo"
        component={PhotoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../../assets/camera-solid.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#b25829' : '#93877b'
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="GeoList"
        component={GeoListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../../assets/location-dot-solid.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#b25829' : '#93877b'
                }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
