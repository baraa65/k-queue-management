import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList } from '../../../App';
import { authStore } from '../../stores/auth';

function Login({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) return;

    try {
      await authStore.login({ username, password });
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.darker,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{ width: 300 }}>
        <View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View>
          <Button title="Login" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

export default Login;
