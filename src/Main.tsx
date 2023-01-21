import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CreateQueue: undefined;
  QueueDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

import Home from './screens/home/Home';
import CreateQueue from './screens/create-queue/CreateQueue';
import QueueDetails from './screens/queue-details/QueueDetails';
import Login from './screens/login/Login';
import { usersStore } from './stores/users';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getUsers = async () => {
    await usersStore.fetchUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="CreateQueue"
            component={CreateQueue}
            options={{ title: 'test' }}
          />
          <Stack.Screen
            name="QueueDetails"
            component={QueueDetails}
            options={{ title: 'test' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
