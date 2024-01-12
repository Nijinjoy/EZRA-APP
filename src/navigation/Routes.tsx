import { View, Text } from 'react-native'
import React, { Children } from 'react'
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
import ExploreScreen from '../screens/ExploreScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import WearEmotionScreen from '../screens/WearEmotionScreen';
import DrawingsScreen from '../screens/DrawingsScreen';
import ProductOrderScreen from '../screens/ProductOrderScreen';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Drawers = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}
            screenOptions={{
                headerShown: false, overlayColor: "transparent", drawerStyle: { width: WIDTH * 0.75 }
            }} initialRouteName='HomeScreen' >
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
                <Stack.Screen name='ExploreScreen' component={ExploreScreen} />
                <Stack.Screen name='FaqScreen' component={FaqScreen} />
                <Stack.Screen name=' ContactScreen' component={ContactScreen} />
                <Stack.Screen name='OrderHistoryScreen' component={OrderHistoryScreen} />
                <Stack.Screen name='OrderDetailsScreen' component={OrderDetailsScreen} />
                {/* <Stack.Screen name='WearEmotionScreen' component={WearEmotionScreen} /> */}
                <Stack.Screen name='DrawingsScreen' component={DrawingsScreen} />
                <Stack.Screen name='ProductOrderScreen' component={ProductOrderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes   