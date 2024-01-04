import { View, Text, SafeAreaView, ScrollView, ImageBackground, TextComponent, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, downArrow, nextArrow, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import TextInputComponent from '../components/TextInputComponent'
import { colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ImageComponent from '../components/ImageComponent'
import ButtonComponent from '../components/ButtonComponent'

const ContactScreen = () => {
    const Navigation = useNavigation()
    const [contacts, setContact] = useState({ childname: "", message: '', image: [], phone: '', email: '' })

    const handleSelectImage = (selectedImageUri) => {
        setContact((prevContacts) => ({ ...prevContacts, image: [selectedImageUri] }));
    };


    const formFields = [
        { label: 'Select child', stateKey: 'childname', component: <TextInputComponent placeholder="Choose from list" /> },
        { label: 'Question', stateKey: 'message', component: <TextInputComponent placeholder="Ask a question" /> },
        { label: 'Upload image', stateKey: 'image', component: <ImageComponent /> },
        { label: 'Phone number', stateKey: 'phone', component: <TextInputComponent placeholder="Enter phone number" /> },
        { label: 'Email', stateKey: 'email', component: <TextInputComponent placeholder="Enter email" /> },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Contact art therapist" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ borderWidth: 0, marginHorizontal: WIDTH * 0.08 }}>
                    {formFields.map((field, index) => (
                        <View key={index} style={{ marginBottom: HEIGHT * 0.02 }}>
                            <Text style={{ marginBottom: HEIGHT * 0.01 }}>{field.label}</Text>
                            {field.component}
                        </View>
                    ))}
                    <Text style={{ fontSize: 13, color: colors.grey, fontWeight: '600', marginVertical: HEIGHT * 0.03 }}>Disclaimer:You will be contacted by the therapist soon regarding your submitted query.</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <ButtonComponent
                        background={colors.darkViolet}
                        text="Send Message"
                        textColor={colors.white}
                        nextarrow={nextArrow}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactScreen