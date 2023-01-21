import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createFirebaseApp } from './src/firebase/index.ts';

createFirebaseApp();

AppRegistry.registerComponent(appName, () => App);
