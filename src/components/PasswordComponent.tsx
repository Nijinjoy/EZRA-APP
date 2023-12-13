import { View, Text, Pressable, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors';

const PasswordComponent = ({ icon, variable, placeholder, passwordBackground, background, value, onChangeText }) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };

    return (
        <View style={{ borderWidth: 1, height: HEIGHT * 0.073, borderRadius: WIDTH * 0.015, flexDirection: 'row', width: WIDTH * 0.83, alignItems: 'center', justifyContent: 'center', backgroundColor: background, borderColor: colors.grey }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible}
                placeholder={placeholder}
                style={{ justifyContent: 'center', flex: 1, padding: WIDTH * 0.03, }}
            />
            <Pressable onPress={togglePasswordVisibility} style={{ borderWidth: 0, justifyContent: "center", flexDirection: 'row', alignItems: 'center', marginRight: WIDTH * 0.03, backgroundColor: passwordBackground, width: WIDTH * 0.185, height: HEIGHT * 0.035, borderRadius: WIDTH * 0.05 }}>
                <Image source={icon} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02 }} resizeMode='contain' />
                <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.01 }}>{variable}</Text>
            </Pressable>
        </View>
    )
}

export default PasswordComponent