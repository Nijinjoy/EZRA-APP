import { View, Text, ImageBackground, Pressable, Image, ScrollView, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, blueIcon, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import ChooseprdctComponent from '../components/ChooseprdctComponent'
import axios from 'axios'
import { colors } from '../constants/Colors'
import { Api } from './Api'
import { useDispatch, useSelector } from 'react-redux'
import commonAction from '../redux/action/commonAction'

const ProductOrderScreen = () => {
    const navigation = useNavigation()
    const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', productIds: "", image: [], addressLine1: "", addressLine2: "", comments: "" })
    const [productlist, setProductlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const { token, userDetails } = useSelector((state) => state?.commonReducer);

    console.log("userdetailss===>", userDetails);

    const handleProductSelect = (productId) => {
        setSelectedProduct(productId);
        setFormData((prev) => ({
            ...prev,
            productIds: [productId],
        }));
    };

    const handleInputChange = (fieldKey, text) => {
        setFormData((prev) => ({ ...prev, [fieldKey]: text }));
        if (errors[fieldKey]) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldKey]: '' }));
        }
    };

    useEffect(() => {
        if (userDetails) {
            setFormData((prevContacts) => ({ ...prevContacts, name: userDetails.name, email: userDetails.email }));
        }
    }, [userDetails]);

    const getTotalPrice = () => {
        const product = productlist.data.find(item => item._id === selectedProduct);
        const quantity = 1;
        const totalPrice = product ? product.price * quantity : null;
        return totalPrice !== null ? ` ${totalPrice} QAR` : 'Total price: N/A';
    };

    const fetchProducts = async () => {
        try {
            const apiUrl = `${Api}/products`;
            const headers = {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.get(apiUrl, { headers });
            if (!response.data.status) {
                throw new Error(`API error! Message: ${response.data.message}`);
            }
            setProductlist(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProducts(token);
    }, [token]);


    const handleTextChange = (key, text) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: text,
        }));
    };

    const formFields = [
        { label: 'Name', stateKey: 'childname', component: <TextInputComponent placeholder="Enter your name" value={userDetails.name} onChangeText={(text) => handleTextChange('childname', text)} /> },
        { label: 'Email', stateKey: 'message', component: <TextInputComponent placeholder="Enter your email" value={userDetails.email} onChangeText={(text) => handleTextChange('email', text)} /> },
        { label: 'Phone number', stateKey: 'message', component: <TextInputComponent placeholder="Phone number" onChangeText={(text) => handleTextChange('phoneNumber', text)} /> },
        { label: 'Choose product', stateKey: 'image', component: <ChooseprdctComponent productList={productlist} onSelect={handleProductSelect} /> },
        { label: 'Upload image', stateKey: 'image', component: <ImageComponent onImageSelect={(imageUri) => handleInputChange('image', imageUri)} /> },
        { label: 'Address', stateKey: 'phone', component: <TextInputComponent placeholder="Address line 1" onChangeText={(text) => handleTextChange('addressLine1', text)} /> },
        { stateKey: 'phone', component: <TextInputComponent placeholder="Address line 2" onChangeText={(text) => handleTextChange('addressLine2', text)} /> },
        { label: 'Any special request ?', stateKey: 'phone', component: <TextInputComponent placeholder="Any special request?" onChangeText={(text) => handleTextChange('message', text)} containerStyle={{ height: HEIGHT * 0.1 }} /> },
    ];

    const createOrder = async () => {
        const { name, email, phoneNumber, image, addressLine1, addressLine2, productIds, parentId } = formData;
        try {
            const response = await fetch(`${Api}/orders`, {
                method: "POST",
                body: JSON.stringify({
                    parentId: userDetails._id,
                    name, email, image, phoneNumber, addressLine1, addressLine2, productIds
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            if (response.status) {
                const token = data?.data?.token;
                if (token) {
                    dispatch(commonAction.createOrder(formData));
                    navigation.navigate('OrderHistoryDrawer');
                }
            } else {
                console.log("Token not found in the response:", data);
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
                    <HeaderComponent title="Wear your emotions"
                        backArrow={backArrow}
                        Width={WIDTH * 0.045}
                        Height={HEIGHT * 0.022}
                        navigation={() => navigation.goBack()}
                        fontsize={18}
                    />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05 }}>
                <View>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.02 }}>
                            <Text style={{ fontSize: 13, color: colors.darkViolet }}>{field.label}</Text>
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
                        <Text style={{ fontSize: 14 }}>Total Price:<Text style={{ color: colors.red }}>{getTotalPrice()}</Text></Text>
                    )}
                    <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '500', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.01 }}>Disclaimer:All orders will be handled externally,upon receiving your order,you will be contacted by our team to finalize your order.</Text>
                </View>
                <ButtonComponent
                    containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.9, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02, borderColor: colors.grey, borderWidth: 0.5 }}
                    label="Complete Order"
                    labelStyle={{ color: colors.white }}
                    icon={nextArrow}
                    onPress={createOrder}
                />
            </ScrollView >
        </View >
    )
}

export default ProductOrderScreen

