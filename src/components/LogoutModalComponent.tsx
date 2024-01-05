import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../constants/Colors'
import PressbtnComponent from './PressbtnComponent'
import { HEIGHT, WIDTH } from '../constants/Dimensions'

const LogoutModalComponent = () => {
    return (
        < View style={{ borderWidth: 0, backgroundColor: colors.white, height: HEIGHT * 0.23, width: WIDTH * 0.8, borderRadius: WIDTH * 0.02 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.darkViolet, fontSize: 15, fontWeight: '500', marginTop: HEIGHT * 0.03 }}>Log out</Text>
                    <Text style={{ color: colors.lightGrey, marginTop: HEIGHT * 0.02, fontSize: 13 }}>Are you sure want to logout</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: HEIGHT * 0.04 }}>
                    <PressbtnComponent />
                    <View style={{ marginHorizontal: WIDTH * 0.03 }}>
                        <PressbtnComponent />
                    </View>
                </View>
            </View>
        </View >
    )
}


export default LogoutModalComponent
