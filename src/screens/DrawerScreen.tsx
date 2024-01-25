import { View, Text, ImageBackground, FlatList, Pressable, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { call, drawerArrow, drawerProfile, drawerShade, drawingsIcon, evaluateIcon, faq, history } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageComponent from '../components/LanguageComponent';
import SignInScreen from './SignInScreen';

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
        title: 'Evaluate',
        icon: evaluateIcon,
        arrow: drawerArrow,
        path: 'ExploreScreen'
    },
    {
        id: 3,
        title: 'Artworks',
        icon: drawingsIcon,
        arrow: drawerArrow,
        path: 'DrawingsScreen'
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
        icon: call,
        arrow: drawerArrow,
        path: ' ContactScreen'
    },
    {
        id: 6,
        title: 'Order product',
        icon: evaluateIcon,
        arrow: drawerArrow,
        path: 'ProductOrderScreen'
    },
    {
        id: 7,
        title: 'Order History',
        icon: history,
        arrow: drawerArrow,
        path: 'OrderHistoryScreen'
    }
]


const DrawerScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { childName } = route.params || {};
    const [formData, setFormData] = useState({ email: '', name: '' })

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const userName = await AsyncStorage.getItem('name');
                const userEmail = await AsyncStorage.getItem('email');
                console.log("Retrieved user==>", { userName, userEmail });
                setFormData(name || '');
                setFormData(email || '');
            } catch (error) {
                console.error('Error retrieving user information:', error);
            }
        };
        getUserInfo();
    }, []);

    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'SignInScreen' }
                ],
            }));
        } catch (error) {
            console.error('Error removing user token:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={drawerShade} style={{ width: WIDTH * 0.749, height: HEIGHT * 0.25, backgroundColor: colors.lightBlue }} resizeMode='contain'>
                <View style={{ margin: HEIGHT * 0.04, position: 'absolute', bottom: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 18, color: colors.darkViolet }}>{formData.email}Nijin</Text>
                    <Text style={{ fontSize: 13, color: colors.lightGrey }}>{formData.name}nijin@gmail.com</Text>
                </View>
            </ImageBackground>
            <ScrollView>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <React.Fragment>
                                <Pressable onPress={() => Navigation.navigate(item.path)} style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', padding: HEIGHT * 0.025 }}>
                                    <View style={{ flex: 0.14 }}>
                                        <Image source={item.icon} style={{ width: WIDTH * 0.055, height: HEIGHT * 0.03 }} />
                                    </View>
                                    <View style={{ flex: 0.8, flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 14, color: colors.darkViolet }}>{item.title}</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }}>
                                        <Image source={item.arrow} style={{ width: WIDTH * 0.015, height: HEIGHT * 0.012 }} />
                                    </View>
                                </Pressable>
                                {index < DATA.length - 1 && (
                                    <View
                                        key={`separator-${index}`}
                                        style={{ backgroundColor: colors.grey, marginHorizontal: HEIGHT * 0.025, borderWidth: 0 }}
                                    />
                                )}
                            </React.Fragment>
                        )
                    }}
                />
                <View style={{ marginHorizontal: WIDTH * 0.01 }}>
                    {/* <LanguageComponent /> */}
                    <Pressable style={{ borderWidth: 0.5, width: WIDTH * 0.34, height: HEIGHT * 0.04, justifyContent: "center", alignItems: 'center', borderRadius: WIDTH * 0.01, marginHorizontal: WIDTH * 0.07, marginVertical: HEIGHT * 0.04 }} onPress={onLogout}>
                        <Text style={{ fontSize: 16, color: colors.darkViolet }}>Log out</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View >
    )
}


export default DrawerScreen