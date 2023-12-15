import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'

const PressbtnComponent = (props) => {
    const { background, value, Color } = props
    return (
        <Pressable style={{ borderWidth: 1, justifyContent: 'center', alignItems: 'center', width: WIDTH * 0.35, height: HEIGHT * 0.066, backgroundColor: background }}>
            <Text style={{ color: Color }}>{value} Value</Text>
        </Pressable>
    )
}

export default PressbtnComponent