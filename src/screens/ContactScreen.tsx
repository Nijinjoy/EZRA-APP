import { View, Text, SafeAreaView, ScrollView, ImageBackground, TextComponent, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, downArrow, history, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import TextInputComponent from '../components/TextInputComponent'
import { colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './Api'
import { useDispatch, useSelector } from 'react-redux'
import commonAction from '../redux/action/commonAction'

const ContactScreen = () => {
    const navigation = useNavigation()
    const [errors, setErrors] = useState({})
    const [contacts, setContact] = useState({ imageUrls: "", childId: "", message: "", email: "", phoneNumber: "" })
    const dispatch = useDispatch()
    const { userDetails } = useSelector((state) => state?.commonReducer)

    console.log("contacts====>", contacts)

    const handleInputChange = (fieldKey, text) => {
        setContact((prev) => ({ ...prev, [fieldKey]: text }));
        if (errors[fieldKey]) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldKey]: '' }));
        }
    }

    useEffect(() => {
        if (userDetails) {
            setContact((prevContacts) => ({ ...prevContacts, childId: userDetails._id }));
        }
    }, [userDetails]);


    const formFields = [
        { label: 'Select child', stateKey: 'childId', component: <TextInputComponent placeholder="Choose from list" value={userDetails.name} onChangeText={(text) => handleInputChange('childId', text)} icon={downArrow} /> },
        { label: 'Message', stateKey: 'message', component: <TextInputComponent placeholder="Ask a question" containerStyle={{ height: HEIGHT * 0.1 }} value={contacts.message} onChangeText={(text) => handleInputChange('message', text)} /> },
        { label: 'Select image', stateKey: 'image', component: <ImageComponent onImageSelect={(imageUri) => handleInputChange('imageUrls', imageUri)} /> },
        { label: 'Phone number', stateKey: 'phone', component: <TextInputComponent placeholder="Enter phone number" value={contacts.phoneNumber} onChangeText={(text) => handleInputChange('phoneNumber', text)} keyboardType='number-type' /> },
        { label: 'Email', stateKey: 'email', component: <TextInputComponent placeholder="Enter email" value={contacts.email} onChangeText={(text) => handleInputChange('email', text)} /> },
    ];


    const contactTherapist = async () => {
        const { childId, email, message, phoneNumber, imageUrls } = contacts
        try {
            const response = await fetch(`${Api}art-therapist/contact`, {
                method: "POST",
                body: JSON.stringify({
                    childId, email, message, phoneNumber, imageUrls
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.status) {
                const data = await response.json()
                const token = data?.data?.token;
                if (childId) {
                    dispatch(commonAction.contactTherapist(contacts))
                    navigation.navigate('HomeScreen');
                }
            }
            else {
                console.log("Token not found in the response:", data);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Contact art therapist" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView>
                <View style={{ borderWidth: 0, marginHorizontal: WIDTH * 0.08 }}>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.015 }}>
                            <Text style={{ marginBottom: HEIGHT * 0.01 }}>{field.label}</Text>
                            {field.component}
                            <View>
                                <Text style={{ color: colors.red, fontSize: 12 }}>{errors[field.stateKey]}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.04 }}>
                <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '600', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05 }}>Disclaimer:You will be contacted by the therapist soon regarding your submitted query</Text>
                <ButtonComponent
                    containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02, borderColor: colors.grey, borderWidth: 0.5 }}
                    label="Send Message"
                    icon={nextArrow}
                    labelStyle={{ color: colors.white }}
                    onPress={contactTherapist}
                />
            </View>
        </View >
    )
}

export default ContactScreen



// const validateForm = () => {
//     const newErrors = {};
//     formFields.forEach((field) => {
//         if (!contacts[field.stateKey]) {
//             newErrors[field.stateKey] = `${field.label} is required`;
//         }
//     });
//     setErrors(newErrors);
//     setIsFormValid(Object.keys(newErrors).every((key) => !newErrors[key]));
// };
