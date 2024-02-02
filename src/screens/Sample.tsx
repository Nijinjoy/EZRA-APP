import { View, Text, SafeAreaView, ImageBackground, SectionList, Pressable, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, cup, keyChain, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'


const OrderHistory1 = [
    {
        id: 1,
        orderid: '#123',
        title: 'Tuesday,23rd January 2022',
        icon: cup,
        name: 'Custom cup print',
        price: '20',
        path: 'OrderDetailsScreen'
    },
    {
        id: 2,
        orderid: '#123',
        title: 'Tuesday,23rd January 2022',
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
        title: 'Tuesday,23rd January 2022',
        icon: keyChain,
        name: 'Custom cup print',
        price: '20',
        path: 'OrderDetailsScreen'
    },
    {
        id: 2,
        orderid: '#123',
        title: 'Tuesday,23rd January 2022',
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


const OrderHistoryScreen = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const Navigation = useNavigation()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JkNDkxN2UwOGE1MjA2MWFjNTk3NzIiLCJpc0FkbWluIjp0cnVlLCJyb2xlIjoic3RhZmYiLCJpYXQiOjE2NzMzNDk0MTZ9.D-347fvwGHtspHwYW6OlRD4eFdIGEDSdoL5Mm7XCKTY';

                const response = await fetch('https://esra-dev.applab.qa/api/orders?page_no=7&item_per_page=23', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const responseData = await response.json();
                if (responseData.status === true) {
                    const formattedData = responseData.data.map(order => ({
                        title: new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }),
                        data: order.products.map(product => ({
                            id: product._id,
                            orderid: order._id,
                            icon: { uri: product.image },
                            name: product.title_en,
                            price: product.price.toString(),
                            path: 'OrderDetailsScreen',
                        })),
                    }));
                    setOrderData(formattedData);
                } else {
                    setOrderData([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Order History" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }} showsVerticalScrollIndicator={false}>
                {orderData.length === 0 ? (
                    <View style={{ justifyContent: 'center', alignItems: "center", flex: 1 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, color: colors.blue, flex: 1, justifyContent: "center" }}>
                            No data found
                        </Text>
                    </View>
                ) : (
                    <SectionList
                        sections={orderData}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable style={{ flexDirection: 'row', margin: 10 }} onPress={() => Navigation.navigate('OrderDetailsScreen', { productDetails: item, title: item.title })}>
                                <Image source={item.icon} style={{ width: WIDTH * 0.215, height: HEIGHT * 0.1 }} />
                                <View style={{ flexDirection: "column", margin: HEIGHT * 0.01 }}>
                                    <Text style={{ color: colors.lightGrey }}>Order ID {item.orderid.substring(0, 8)}</Text>
                                    <Text style={{ fontSize: 15, color: colors.titleColor }}>{item.name}</Text>
                                    <Text style={{ color: colors.blue, fontSize: 18, marginTop: HEIGHT * 0.01 }}>QAR <Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>
                                </View>
                            </Pressable>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={{ marginHorizontal: WIDTH * 0.02, marginVertical: 6 }}>
                                <Text style={{ fontSize: 15 }}>{title}</Text>
                            </View>
                        )}
                    />
                )}
            </ScrollView>
        </View>
    )
}

export default OrderHistoryScreen