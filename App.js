import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from './Screens/Home';
import Comments from './Screens/Comments';

const Stack = createStackNavigator();
const StackScreen = () => (

  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={
        { title: 'Home' }
      }
    />
    <Stack.Screen
      name="Comments"
      component={Comments}
      options={
        { title: 'Comments' }
      }
    />
  </Stack.Navigator>

);

const App = () => {
  return (
    <NavigationContainer>
      {
        <StackScreen />
      }
    </NavigationContainer>
  )
}

export default App;
