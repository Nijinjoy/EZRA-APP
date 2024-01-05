import { View, Text, SafeAreaView, ImageBackground, SectionList, Pressable, Image, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, cup, keyChain, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'


const OrderHistoryScreen = () => {
    const [activeItem, setActiveItem] = useState(null);
    const Navigation = useNavigation()

    const OrderHistory1 = [
        {
            id: 1,
            orderid: '#123',
            icon: cup,
            name: 'Custom cup print',
            price: '20',
            path: 'OrderDetailsScreen'
        },
        {
            id: 2,
            orderid: '#123',
            icon: keyChain,
            name: 'Custom cup print',
            price: '20',
            path: 'OrderDetailsScreen'
        }
    ]

    const OrderHistory2 = [
        {
            id: 1,
            orderid: '#123',
            icon: keyChain,
            name: 'Custom cup print',
            price: '20',
            path: 'OrderDetailsScreen'
        },
        {
            id: 2,
            orderid: '#123',
            icon: cup,
            name: 'Custom cup print',
            price: '20',
            path: 'OrderDetailsScreen'
        },
        {
            id: 3,
            orderid: '#123',
            icon: keyChain,
            name: 'Custom cup print',
            price: '20',
            path: 'OrderDetailsScreen'
        },
        {
            id: 4,
            orderid: "#123",
            icon: keyChain,
            name: "Custom cup print",
            price: '30',
            path: 'OrderDEtailsScreen'
        }
    ]

    const OrderHistory = [
        {
            title: 'Tuesday,23rd January 2022',
            data: OrderHistory1,
        },
        {
            title: "Thursday,25th January 2022",
            data: OrderHistory2
        }
    ]

    // const orderDetails = async () => {
    //     if (validateInputs) {
    //         try {
    //             const response = await fetch('https://hbkuesra.herokuapp.com/api/user/login', {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     email: OrderHistory1.email,
    //                     password: OrderHistory2.password
    //                 })
    //             })
    //             if (response.ok) {
    //                 const result = await response.json()
    //                 await AsyncStorage.setItem('usertoken', result.token)
    //                 Navigation.navigate('HomeScreen')
    //             } else {
    //                 const errorData = await response.json();
    //                 Alert.alert('Error', errorData.message || 'Invalid credentials. Please try again.');
    //             }
    //         }
    //         catch (error) {
    //             console.log('error during sign-in', error);
    //             Alert.alert('Error', 'An unexpected error occured')
    //         }
    //     }
    // }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Order History" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }}>
                <SectionList
                    sections={OrderHistory}
                    keyExtractor={(item, index) => item + index}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable style={{ flexDirection: 'row', margin: 10 }} onPress={() => Navigation.navigate('OrderDetailsScreen')}>
                            <Image source={item.icon} style={{ width: WIDTH * 0.215, height: HEIGHT * 0.1 }} />
                            <View style={{ flexDirection: "column", margin: HEIGHT * 0.01 }}>
                                <Text style={{ color: colors.lightGrey }}>Order ID {item.orderid}</Text>
                                <Text style={{ fontSize: 15, color: colors.titleColor }}>{item.name}</Text>
                                <Text style={{ color: colors.blue, fontSize: 18 }}>QAR <Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>
                            </View>
                        </Pressable>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ marginHorizontal: WIDTH * 0.02, marginVertical: 6 }}>
                            <Text style={{ fontSize: 15 }}>{title}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View >
    )
}

export default OrderHistoryScreen