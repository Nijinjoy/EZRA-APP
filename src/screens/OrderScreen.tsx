//sample screen
import { View, Text, ImageBackground, Pressable, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../components/HeaderComponent'
import { addIcon, arrowIcon, backArrow, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import ChooseprdctComponent from '../components/ChooseprdctComponent'
import axios from 'axios'


const WearEmotionScreen = ({ icon, value }) => {
    const Navigation = useNavigation();
    const [productlist, setProductlist] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://esra-dev.applab.qa/api/products';
        const headers = {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ1NWYzMDZmMzA0MzAwNzQxMmQ5M2MiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjc2NTMwNjk3fQ.8ZUDKzZ9Lfx8_23JC2yPzYFUGwRmIOBG_L0ZZxcexrk`,
            'Content-Type': 'application/json',
        };
        axios.get(apiUrl, { headers })
            .then(response => {
                if (!response.data.status) {
                    throw new Error(`API error! Message: ${response.data.message}`);
                }
                setProductlist(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const getProductPrice = (productId) => {
        const product = productlist.data.find(item => item._id === productId);
        return product ? product.price : null;
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent
                        title="Order a product"
                        backArrow={backArrow}
                        Width={WIDTH * 0.045}
                        Height={HEIGHT * 0.022}
                        navigation={() => Navigation.goBack()}
                        fontsize={18}
                    />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05 }}>
                <View style={{}}>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.02, margin: WIDTH * 0.01 }}>
                            <Text style={{ fontSize: 12, color: colors.darkViolet }}>{field.label}</Text>
                            <View style={{ marginTop: HEIGHT * 0.01, }}>
                                {field.component}
                            </View>
                        </View>
                    ))}
                    <Text>Disclaimer:All orders will be handled externallt,upon receiving</Text>
                    <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '500', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.01 }}>Disclaimer: All orders will be handled externally, upon receiving your order, you will be contacted by our team to finalize your order.</Text>
                </View>

                <View style={{ borderWidth: 1, height: HEIGHT * 0.1 }}>
                    <Text style={{ borderWidth: 1, width: WIDTH * 0.2, height: HEIGHT * 0.2 }}>{data?.image}</Text>
                    <Text style={{ borderWidth: 1, width: WIDTH * 0.2, height: HEIGHT * 0.2 }}>{data?.title}</Text>
                </View>

                <View style={{ justifyContent: "center", alignItems: 'center', }}>
                    <ButtonComponent
                        background={colors.darkViolet}
                        text="Complete Order"
                        nextarrow={nextArrow}
                        Width={WIDTH * 0.9}
                        textColor={colors.white}
                    />
                </View>
            </ScrollView>
        </View>
    );
};


export default WearEmotionScreen;

