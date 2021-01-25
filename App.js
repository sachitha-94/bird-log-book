import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs'
import configureStore from './store/configureStore';

const store = configureStore();

console.disableYellowBox=true;
export default function App() {
 
  return (
    <Provider store = { store }>
      <NavigationContainer >
      <BottomTabs />
    </NavigationContainer>
    </Provider>
  );
}
