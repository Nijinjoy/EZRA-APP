import { View, Text, SafeAreaView, ScrollView, ImageBackground, TextComponent, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, downArrow, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import TextInputComponent from '../components/TextInputComponent'
import { colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'


const ContactScreen = () => {
    const Navigation = useNavigation()
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)
    const [contacts, setContact] = useState({ childname: "", message: '', image: [], phone: '', email: '' })

    const handleSelectImage = (selectedImageUri) => {
        setContact((prevContacts) => ({ ...prevContacts, image: [selectedImageUri] }));
    };

    const handleInputChange = (fieldKey, text) => {
        setContact((prev) => ({ ...prev, [fieldKey]: text }));
        if (errors[fieldKey]) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldKey]: '' }));
        }
    };

    const formFields = [
        { label: 'Select child', stateKey: 'childname', component: <TextInputComponent placeholder="Choose from list" value={contacts.childname} onChangeText={(text) => handleInputChange('childname', text)} /> },
        { label: 'Question', stateKey: 'message', component: <TextInputComponent placeholder="Ask a question" Height={HEIGHT * 0.12} value={contacts.message} onChangeText={(text) => handleInputChange('message', text)} /> },
        { label: 'Upload image', stateKey: 'image', component: <ImageComponent onSelectImage={handleSelectImage} /> },
        { label: 'Phone number', stateKey: 'phone', component: <TextInputComponent placeholder="Enter phone number" value={contacts.phone} onChangeText={(text) => handleInputChange('phone', text)} /> },
        { label: 'Email', stateKey: 'email', component: <TextInputComponent placeholder="Enter email" value={contacts.email} onChangeText={(text) => handleInputChange('email', text)} /> },
    ];

    const validateForm = () => {
        const newErrors = {};
        formFields.forEach((field) => {
            if (!contacts[field.stateKey]) {
                newErrors[field.stateKey] = `${field.label} is required`;
            }
        });
        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).every((key) => !newErrors[key]));
    };

    const handleSendMessage = async () => {
        validateForm()
        if (isFormValid) {
            console.log('Form is valid. Sending message...');
        } else {
            Alert.alert('Validation Error', 'Please fill in all required fields.');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Contact art therapist" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
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
                <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '600', marginVertical: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.0125 }}>Disclaimer:You will be contacted by the therapist soon regarding your submitted query</Text>
                <ButtonComponent
                    containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02, borderColor: colors.grey, borderWidth: 0.5 }}
                    label="Send Message"
                    icon={nextArrow}
                    labelStyle={{ color: colors.white }}
                    onPress={handleSendMessage}
                />
            </View>
        </View >
    )
}

export default ContactScreen