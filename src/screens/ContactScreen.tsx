import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { backArrow, downArrow } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import TextInputComponent from '../components/TextInputComponent'

const ContactScreen = () => {
    const [contacts, setContact] = useState({ childname: "", message: '', image: [], mobile: '', email: '' })

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                <HeaderComponent backArrow={backArrow} title="Contact an art therapist" fontsize={18} />
            </SafeAreaView>
            <ScrollView style={{ marginHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.07 }}>
                <View style={{ marginTop: HEIGHT * 0.04 }}>
                    {/* {Object.entries(contacts).map(([key, value]) => renderTextInput(key, value))} */}
                </View>
            </ScrollView>
        </View>
    )
}

export default ContactScreen