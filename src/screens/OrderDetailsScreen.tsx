import { View, Text, ImageBackground, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/Colors'
import HeaderComponent from '../components/HeaderComponent'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { backArrow, cupp, shadedIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'

const OrderDetailsScreen = () => {
    const Navigation = useNavigation()
    const [color, setColor] = useState([])

    return (
        <View style={{ flex: 1, borderWidth: 0, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15, borderWidth: 0 }}>
                <SafeAreaView>
                    <HeaderComponent title="Order Details" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ borderWidth: 0 }}>
                <Image source={cupp} style={{ width: WIDTH * 0.85, height: HEIGHT * 0.17, alignSelf: 'center' }} resizeMode='cover' />
                <View style={{ marginHorizontal: WIDTH * 0.07 }}>
                    <Text style={{ fontSize: 13, color: colors.grey, marginTop: HEIGHT * 0.03 }}>12 March 2021</Text>
                    <Text style={{ fontSize: 18, color: colors.darkViolet }}>Custom cup print</Text>

                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontSize: 17, color: colors.blue, marginTop: HEIGHT * 0.03 }}>Order Details</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ height: 1, marginTop: 20, marginHorizontal: 10, borderWidth: 0.5, width: WIDTH * 0.6, borderColor: colors.grey }} />
                        </View>
                    </View>

                    <Text style={{ fontSize: 15, color: colors.darkViolet, marginTop: HEIGHT * 0.03 }}>Order ID #5445</Text>
                    <View style={{ flexDirection: "row", borderWidth: 0, marginVertical: HEIGHT * 0.02 }}>
                        <View style={{ flex: 0.7 }}>
                            <Text style={{ fontSize: 15, color: colors.grey }}>Sub Total</Text>
                            <Text style={{ fontSize: 15, color: colors.grey, marginVertical: HEIGHT * 0.02 }}>Shipping fee</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.darkViolet, marginVertical: HEIGHT * 0.02 }}>Total</Text>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <Text style={{ fontSize: 15, color: colors.grey, textAlign: 'right' }}>QAR 20.00</Text>
                            <Text style={{ fontSize: 15, color: colors.grey, textAlign: 'right', marginVertical: HEIGHT * 0.02 }}>QAR 10.00</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.darkViolet, textAlign: 'right', marginVertical: HEIGHT * 0.02 }}>QAR 30.00 </Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 17, color: colors.blue }}>Address</Text>
                    <Text style={{ fontSize: 15, color: colors.darkViolet, marginVertical: HEIGHT * 0.02 }}>Bazel Zakkariya</Text>
                    <Text style={{ fontSize: 15, color: colors.grey }}>basel@gmail.com</Text>
                    <Text style={{ fontSize: 15, marginVertical: HEIGHT * 0.02, color: colors.darkViolet }}>3rd Floor,Section J,Mirqab Mall,AlMirqab Al Jadeed St.Doha,Qatar</Text>
                </View>
            </View>
        </View >
    )
}

export default OrderDetailsScreen