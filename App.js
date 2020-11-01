import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homescreen from './screens/Homescreen'
import Addscreen from './screens/AddScreen'


const navigator = createStackNavigator(
  {
    Home: Homescreen,
    Add: Addscreen

  },
  {

    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000',
        height: 30,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },

  },







)

export default createAppContainer(navigator);