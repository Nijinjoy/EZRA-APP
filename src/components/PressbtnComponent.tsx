import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'

const PressbtnComponent = (props) => {
    const { background, value, Color } = props
    return (
        <Pressable style={{ borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', width: WIDTH * 0.25, height: HEIGHT * 0.05, backgroundColor: background, padding: HEIGHT * 0.01 }}>
            <Text style={{ color: Color }}>{value}</Text>
        </Pressable>
    )
}


export default PressbtnComponent