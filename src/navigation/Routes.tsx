import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from '../screens/SplashScreen'
import GetStartedScreen from '../screens/GetStartedScreen'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import AddChildScreen from '../screens/AddChildScreen'
import HomeScreen from '../screens/HomeScreen'
import DrawerScreen from '../screens/DrawerScreen';
import { WIDTH } from '../constants/Dimensions';
import ContactScreen from '../screens/ContactScreen';
import ChildrenScreen from '../screens/ChildrenScreen';
import FaqScreen from '../screens/FaqScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Drawers = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}
            screenOptions={{
                headerShown: false, overlayColor: "transparent", drawerStyle: {
                    width: WIDTH * 0.7
                }
            }} initialRouteName='HomeScreen'>
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        </Drawer.Navigator>
    )
}


const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='GetStartedScreen' component={GetStartedScreen} />
                <Stack.Screen name='SignInScreen' component={SignInScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                <Stack.Screen name='AddChildScreen' component={AddChildScreen} />
                <Stack.Screen name='HomeScreen' component={Drawers} />
                <Stack.Screen name='ChildrenScreen' component={ChildrenScreen} />
                <Stack.Screen name='FaqScreen' component={FaqScreen} />
                <Stack.Screen name=' ContactScreen' component={ContactScreen} />
                <Stack.Screen name='OrderHistoryScreen' component={OrderHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes