import { View, Text, ImageBackground, FlatList, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { drawerArrow, drawerProfile, drawerShade, drawingsIcon, evaluateIcon, faq } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageComponent from '../components/LanguageComponent';
import { CommonActions } from '@react-navigation/native';

const DATA = [
    {
        id: 1,
        title: 'Children',
        icon: drawerProfile,
        arrow: drawerArrow,
        path: 'ChildrenScreen'
    },
    {
        id: 2,
        title: 'Explore',
        icon: evaluateIcon,
        arrow: drawerArrow,
        path: 'EvaluateScreen'
    },
    {
        id: 3,
        title: 'Artworks',
        icon: drawingsIcon,
        arrow: drawerArrow
    },
    {
        id: 4,
        title: 'Faqs',
        icon: faq,
        arrow: drawerArrow,
        path: 'FaqScreen'
    },
    {
        id: 5,
        title: 'Contact an art therapist',
        icon: faq,
        arrow: drawerArrow,
        path: ' ContactScreen'
    },
    {
        id: 6,
        title: 'Wear your emotions',
        icon: evaluateIcon,
        arrow: drawerArrow
    },
    {
        id: 7,
        title: 'Order History',
        icon: evaluateIcon,
        arrow: drawerArrow,
        path: 'OrderHistoryScreen'
    },
]

const DrawerScreen = () => {
    const Navigation = useNavigation()

    // const onLogout = () => {
    //     Navigation.reset({
    //         index: 0,
    //         routes: [{ name: 'SignInScreen' }],
    //     });
    // };

    const onLogout = async () => {
        await AsyncStorage.setItem('isLoggedIn', 'false');
        Navigation.reset({
            index: 0,
            routes: [{ name: 'SignInScreen' }],
        });
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            // Check the login status when the component mounts
            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                // If the user is not logged in, navigate to the sign-in screen
                Navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignInScreen' }],
                });
            }
        };
        checkLoginStatus();
    }, [Navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={drawerShade} style={{ width: WIDTH * 0.749, height: HEIGHT * 0.25, backgroundColor: colors.lightBlue }} resizeMode='contain'>
                <View style={{ margin: HEIGHT * 0.04, position: 'absolute', bottom: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 18, color: colors.darkViolet }}>Aaliya Ahammed</Text>
                    <Text style={{ fontSize: 13, color: colors.lightGrey }}>aaliya@gmail.com</Text>
                </View>
            </ImageBackground >
            <ScrollView >
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => Navigation.navigate(item.path)} style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', padding: HEIGHT * 0.025, borderWidth: 0 }}>
                                <View style={{ flex: 0.2 }}>
                                    <Image source={item.icon} style={{ width: WIDTH * 0.055, height: HEIGHT * 0.03 }} />
                                </View>
                                <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, color: colors.darkViolet }}>{item.title}</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <Image source={item.arrow} style={{ width: WIDTH * 0.015, height: HEIGHT * 0.012 }} />
                                </View>
                            </Pressable>
                        )
                    }}
                />
                <LanguageComponent />

                <Pressable style={{ borderWidth: 0.5, width: WIDTH * 0.22, height: HEIGHT * 0.04, justifyContent: "center", alignItems: 'center', borderRadius: WIDTH * 0.01, marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.04 }} onPress={onLogout}>
                    <Text style={{ fontSize: 16, color: colors.darkViolet }}>Log out</Text>
                </Pressable>

            </ScrollView>

        </View >
    )
}

export default DrawerScreen