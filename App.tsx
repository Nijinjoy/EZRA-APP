import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, } from 'react-native';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux'
//import { store } from './src/redux/store';
import store from './src/redux/store';

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
