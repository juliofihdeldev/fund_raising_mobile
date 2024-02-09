import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

window.navigator.userAgent = 'ReactNative';
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
