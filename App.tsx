import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, } from 'react-native';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux'
//import { store } from './src/redux/store';
import configureStore from './src/redux/store';

const store = configureStore()

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
    </Provider>
  );
}


export default App;
