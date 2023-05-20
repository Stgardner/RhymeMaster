import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import CreateAccountScreen from './components/CreateAccountScreen';
import RhymeGeneratorScreen from './components/RhymeGenerator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />  
        <Stack.Screen name="RhymeGenerator" component={RhymeGeneratorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;