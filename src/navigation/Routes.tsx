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
import DrawingsScreen from '../screens/DrawingsScreen';
import ProductOrderScreen from '../screens/ProductOrderScreen';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Drawers = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerScreen {...props} />}
            screenOptions={{
                headerShown: false,
                overlayColor: 'transparent',
                drawerStyle: { width: WIDTH * 0.75 },
            }}
            initialRouteName="HomeScreen"
        >
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            <Drawer.Screen name="ChildrenDrawer" component={ChildrenScreen} />
            <Drawer.Screen name="ExploreDrawer" component={ExploreScreen} />
            <Drawer.Screen name="FaqDrawer" component={FaqScreen} />
            <Drawer.Screen name="ContactDrawer" component={ContactScreen} />
            <Drawer.Screen name="OrderHistoryDrawer" component={OrderHistoryScreen} />
            <Drawer.Screen name="OrderDetailsDrawer" component={OrderDetailsScreen} />
            <Drawer.Screen name="DrawingsDrawer" component={DrawingsScreen} />
            <Drawer.Screen name="ProductOrderDrawer" component={ProductOrderScreen} />
            <Drawer.Screen name="AddChildDrawer" component={AddChildScreen} />
        </Drawer.Navigator>
    );
};

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='GetStartedScreen' component={GetStartedScreen} />
                <Stack.Screen name='SignInScreen' component={SignInScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                <Stack.Screen name='Drawers' component={Drawers} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes