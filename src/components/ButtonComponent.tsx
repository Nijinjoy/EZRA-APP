import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const ButtonComponent = (props) => {
    const navigation = useNavigation()
    const { background, text, nextarrow, textColor, navigate, borderRadius, Bottom } = props
    return (
        <Pressable style={{ borderWidth: 0.5, width: WIDTH * 0.89, height: HEIGHT * 0.072, backgroundColor: background, borderRadius: borderRadius, flexDirection: 'row', justifyContent: "center", alignItems: 'center', borderColor: colors.grey, top: Bottom }} onPress={navigate}>
            <Text style={{ color: textColor, fontSize: 16, fontWeight: '500', alignSelf: 'center' }}>{text}</Text>
            <Image source={nextarrow} style={{ width: WIDTH * 0.0325, height: HEIGHT * 0.016, marginHorizontal: WIDTH * 0.03 }} />
        </Pressable>
    )
}


export default ButtonComponent