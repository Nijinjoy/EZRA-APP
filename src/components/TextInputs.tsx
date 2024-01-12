import { View, TextInput, Image, Text, Pressable, } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors';
import { eye } from '../assets/images';

const TextInputs = (props) => {

    const { placeholder, height, viewStyle, paddingLeft, onChangeText, errorMsg, backgroundColor, placeholderTextColor, togglePassword, secureTextEntry = false, style3, borderRadius } = props;

    const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry)

    return (
        <View>
            <View style={{ height: HEIGHT * 0.07, marginVertical: HEIGHT * 0.012, borderRadius: WIDTH * 0.015, backgroundColor: backgroundColor, ...viewStyle }}>
                <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        style={{ paddingLeft: paddingLeft, height: HEIGHT * 0.05, width: WIDTH * 0.6, ...style3 }}
                        onChangeText={onChangeText}
                        secureTextEntry={isSecureTextEntry} />
                    {
                        togglePassword && (
                            <Pressable onPress={() => { setIsSecureTextEntry(!isSecureTextEntry) }} style={{ flexDirection: "row" }}>
                                <Image source={!isSecureTextEntry ? eye : eye} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02 }} resizeMode='contain' />
                                <Text style={{ fontSize: 12, marginHorizontal: WIDTH * 0.01 }}>Show </Text>
                            </Pressable>
                        )}
                </View>
            </View>
            <Text style={{ color: colors.red, paddingHorizontal: WIDTH * 0.1, bottom: HEIGHT * 0.005 }}>{errorMsg}</Text>
        </View >
    )
}

export default TextInputs;