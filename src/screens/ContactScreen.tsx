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
import { Dropdown } from 'react-native-element-dropdown'
import DropdownComponent from '../components/DropdownComponent'

const ContactScreen = () => {
    const navigation = useNavigation()
    const [errors, setErrors] = useState({})
    const [contacts, setContact] = useState({ imageUrls: "", childId: "", message: "", email: "", phoneNumber: "" })
    const dispatch = useDispatch()
    const { userDetails, getUser, token } = useSelector((state) => state?.commonReducer)
    const [value, setValue] = useState(null);

    const handleInputChange = (fieldKey, text) => {
        setContact((prev) => ({ ...prev, [fieldKey]: text }));
        if (errors[fieldKey]) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldKey]: '' }));
        }
    }

    const handleSelectChild = (child) => {
        setContact(prevContact => ({
            ...prevContact,
            childId: child._id,
        }));
    };

    // useEffect(() => {
    //     if (userDetails) {
    //         setContact((prevContacts) => ({ ...prevContacts, childId: userDetails._id }));
    //     }
    // }, [userDetails]);

    useEffect(() => {
        if (getUser) {
            setContact((prevContacts) => ({ ...prevContacts, childId: getUser._id }));
        }
    }, [getUser]);

    const formFields = [
        { label: 'Select child', stateKey: 'childId', component: <DropdownComponent onSelectItem={handleSelectChild} /> },
        { label: 'Message', stateKey: 'message', component: <TextInputComponent placeholder="Ask a question" containerStyle={{ height: HEIGHT * 0.12 }} value={contacts.message} onChangeText={(text) => handleInputChange('message', text)} /> },
        { label: 'Select image', stateKey: 'image', component: <ImageComponent onImageSelect={(imageUri) => handleInputChange('imageUrls', imageUri)} /> },
        { label: 'Phone number', stateKey: 'phoneNumber', component: <TextInputComponent placeholder="Enter phone number" value={contacts.phoneNumber} onChangeText={(text) => handleInputChange('phoneNumber', text)} keyboardType='number-type' /> },
        { label: 'Email', stateKey: 'email', component: <TextInputComponent placeholder="Enter email" value={contacts.email} onChangeText={(text) => handleInputChange('email', text)} /> },
    ];


    const contactTherapist = async () => {
        // const isValid = validateForm();
        // if (!isValid) {
        //     return;
        // }
        const { childId, email, message, phoneNumber, imageUrls } = contacts

        console.log("childiiddd===>", childId, email, message, phoneNumber);

        try {
            const body = {
                childId: childId,
                email: email,
                message: message,
                phoneNumber: phoneNumber,
                contactMethod: "Email"
            }
            console.log("body=>", body);

            const response = await fetch(`${Api}/art-therapist/contact`, {
                method: "POST",
                body,
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })
            const responseJSON = await response.json()
            console.log("add child===>", responseJSON);
            if (response.status) {
                Alert.alert('Submitted Sucessfully')
                navigation.navigate('HomeScreen');
            } else {
                Alert.alert('Error', 'Failed to add child');
            }
        }
        catch (error) {
            console.error('Error adding child:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Contact art therapist" backArrow={backArrow} imageWidth={WIDTH * 0.045} imageHeight={HEIGHT * 0.022} navigation={() => navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>

            <ScrollView>
                <View style={{ borderWidth: 0, marginHorizontal: WIDTH * 0.08 }}>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.015 }}>
                            <Text style={{ marginBottom: HEIGHT * 0.01 }}>{field.label}</Text>
                            {field.component}
                            <View >
                                <Text style={{ color: colors.red, fontSize: 12 }}>{errors[field.stateKey]}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.04 }}>
                <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '600', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.02 }}>Disclaimer:You will be contacted by the therapist soon regarding your submitted query</Text>
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
//     let formErrors = {};
//     if (!contacts.childId) {
//         formErrors = { ...formErrors, childId: 'Please select a child' };
//     }
//     if (!contacts.message) {
//         formErrors = { ...formErrors, message: 'Please enter a message' };
//     }
//     if (!contacts.phoneNumber) {
//         formErrors = { ...formErrors, phoneNumber: 'Please enter a phone number' };
//     } else if (!/^\d+$/.test(contacts.phoneNumber)) {
//         formErrors = { ...formErrors, phoneNumber: 'Please enter a valid phone number' };
//     }
//     if (!contacts.email) {
//         formErrors = { ...formErrors, email: 'Please enter an email address' };
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts.email)) {
//         formErrors = { ...formErrors, email: 'Please enter a valid email address' };
//     }

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
// };