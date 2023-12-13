import { View, Text, SafeAreaView, ImageBackground, SectionList, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, cup, keyChain, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../constants/Colors'


const OrderHistoryScreen = () => {
    const [activeItem, setActiveItem] = useState(null);
    const Navigation = useNavigation()

    // console.log("widthorder==>", WIDTH * 0.215);
    // console.log("hightorder==>", HEIGHT * 0.12);
    const OrderHistory1 = [
        {
            id: 1,
            orderid: '#123',
            icon: cup,
            name: 'Custom cup print',
            price: '20'
        },
        {
            id: 2,
            orderid: '#123',
            icon: keyChain,
            name: 'Custom cup print',
            price: '20'
        }
    ]
    const OrderHistory2 = [
        {
            id: 1,
            orderid: '#123',
            icon: keyChain,
            name: 'Custom cup print',
            price: '20'
        },
        {
            id: 2,
            orderid: '#123',
            icon: cup,
            name: 'Custom cup print',
            price: '20'
        },
        {
            id: 3,
            orderid: '#123',
            icon: keyChain,
            name: 'Custom cup print',
            price: '20'
        }
    ]
    const OrderHistory = [
        {
            title: 'Tuesday,23rd January 2022',
            data: OrderHistory1
        },
        {
            title: 'Thurday,25rd January 2022',
            data: OrderHistory2
        },
    ]

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Order History" backArrow={backArrow} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ margin: 20 }}>
                <SectionList
                    sections={OrderHistory}
                    keyExtractor={(item, index) => item + index}
                    scrollEnabled={true}
                    renderItem={({ item }) => (
                        <Pressable style={{ flexDirection: 'row', margin: 10 }} onPress={() => {
                            setActiveItem(item.id);
                            item.onPress();
                        }}>
                            <Image source={item.icon} style={{ width: WIDTH * 0.215, height: HEIGHT * 0.12 }} />
                            <View style={{ flexDirection: "column", margin: 10 }}>
                                <Text style={{ color: colors.lightGrey }}>Order ID {item.orderid}</Text>
                                <Text style={{ fontSize: 15, color: colors.titleColor }}>{item.name}</Text>
                                <Text style={{ color: colors.blue, fontSize: 18, marginVertical: HEIGHT * 0.02 }}>QAR<Text style={{ fontWeight: 'bold' }}>{item.price}</Text></Text>
                            </View>
                        </Pressable>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontSize: 15 }}>{title}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default OrderHistoryScreen