import { View, Text, ImageBackground, Pressable, Image, ScrollView, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/Colors'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, blueIcon, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import ChooseprdctComponent from '../components/ChooseprdctComponent'
import axios from 'axios'
import { Api } from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ProductOrderScreen = () => {
    const Navigation = useNavigation()
    const [formData, setFormData] = useState({ Name: '', Email: '', Phone: '', productId: "", Image: '', addressLine1: '', addressLine2: {} })
    const [productlist, setProductlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
    };

    const getTotalPrice = () => {
        if (!productlist || !productlist.data) {
            return 'Total price: N/A';
        }
        const product = productlist.data.find(item => item._id === selectedProduct);
        const quantity = 1;
        const totalPrice = product ? product.price * quantity : null;
        return totalPrice !== null ? ` ${totalPrice} QAR` : 'Total price: N/A';
    };

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

    const formFields = [
        { label: 'Name', stateKey: 'childname', component: <TextInputComponent placeholder="Enter your name" /> },
        { label: 'Email', stateKey: 'message', component: <TextInputComponent placeholder="Enter your email" /> },
        { label: 'Phone number', stateKey: 'message', component: <TextInputComponent placeholder="Phone number" /> },
        { label: 'Choose product', stateKey: 'image', component: <ChooseprdctComponent productList={productlist} /> },
        { label: 'Upload image', stateKey: 'image', component: <ImageComponent /> },
        { label: 'Address', stateKey: 'phone', component: <TextInputComponent placeholder="Address line 1" /> },
        { stateKey: 'phone', component: <TextInputComponent placeholder="Address line 2" /> },
    ];

    const createOrder = async () => {
        const { Name, Email, Phone, productId, Image, addressLine1, addressLine2 } = formData;
        try {
            const response = await fetch(`https://esra-dev.applab.qa/api/orders`, {
                method: 'POST',
                body: JSON.stringify({
                    name: Name,
                    email: Email,
                    phone: Phone,
                    productId: productId,
                    image: Image,
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                const data = await response.json()
                if (data && data._id) {
                    await AsyncStorage.setItem('userid', data._id);
                    await AsyncStorage.setItem('name', Name);
                    await AsyncStorage.setItem('email', Email);
                    await AsyncStorage.setItem('productid', productId);
                    await AsyncStorage.setItem('image', Image);
                    await AsyncStorage.setItem('addressLine1', addressLine1);
                    await AsyncStorage.setItem('addressLine2', addressLine2)
                    Alert.alert('Successfull order')
                    Navigation.navigate('OrderHistoryScreen');
                } else {
                    console.log("Invalid user credentials or missing _id field");
                }
            }
            else {
                console.log("Login failed. Status:", response.status);
            }
        }
        catch (error) {
            console.log("Error:", error);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Order a product"
                        backArrow={backArrow}
                        Width={WIDTH * 0.045}
                        Height={HEIGHT * 0.022}
                        navigation={() => Navigation.goBack()}
                        fontsize={18}
                    />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05 }}>
                <View>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.02 }}>
                            <Text style={{ fontSize: 12, color: colors.darkViolet }}>{field.label}</Text>
                            <View style={{ marginTop: HEIGHT * 0.01 }}>
                                {field.label === 'Choose product' ? (
                                    <ChooseprdctComponent productList={productlist} onSelect={handleProductSelect} />
                                ) : (
                                    field.component
                                )}
                            </View>
                        </View>
                    ))}

                    {selectedProduct && (
                        <Text style={{ fontSize: 14 }}>Total Price:<Text style={{ color: colors.red }}>{getTotalPrice()} </Text></Text>
                    )
                    }
                    <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '500', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.01 }}>Disclaimer:All orders will be handled externally,upon receiving your order,you will be contacted by our team to finalize your order.</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: 'center' }}>
                    <ButtonComponent
                        containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02, borderColor: colors.grey, borderWidth: 0.5 }}
                        label="Complete Order"
                        labelStyle={{ color: colors.white }}
                        icon={nextArrow}
                        onPress={createOrder}
                    />
                </View>
            </ScrollView >
        </View >
    )
}


export default ProductOrderScreen