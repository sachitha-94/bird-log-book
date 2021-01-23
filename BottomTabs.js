import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import Homescreen from './screens/Homescreen'
import Addscreen from './screens/AddScreen'
import MapScreen from './screens/MapScreen'
import Settings from './screens/Settings'
import Gallery from './screens/GalleryScreen'

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="settings"
      activeColor="black"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: 'green' }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Addscreen}
        options={{
          tabBarLabel: 'Add Note',
          tabBarIcon: ({ color }) => (
            <AntDesign name="addfile" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={Gallery}
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="photo" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: 'settings',
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabs;
{/* <Foundation name="clipboard-notes" size={24} color="black" /> */ }