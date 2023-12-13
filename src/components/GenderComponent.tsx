import { View, Text } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'

const GenderComponent = (props) => {
    const { gender } = props
    return (
        <View style={{ borderWidth: 1, justifyContent: "center", alignItems: "center", padding: HEIGHT * 0.01, borderColor: colors.darkViolet, borderRadius: WIDTH * 0.02 }}>
            <Text style={{ color: colors.darkViolet }}>{gender}</Text>
        </View>
    )
}

export default GenderComponent