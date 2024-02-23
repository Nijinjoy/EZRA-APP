import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { colors } from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { camera, close, gallery } from '../assets/images'

const UploadComponent = () => {

    return (
        <View style={{ borderWidth: 0, borderTopRightRadius: WIDTH * 0.04, borderTopLeftRadius: WIDTH * 0.04, backgroundColor: colors.borderColor }}>
            <View style={{ position: 'absolute', right: WIDTH * 0.02, margin: WIDTH * 0.03 }}>
                <Image source={close} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02 }} resizeMode='contain' />
            </View>
            <View style={{ justifyContent: "center", alignItems: 'center', padding: HEIGHT * 0.04 }}>
                <Text style={{ fontSize: 18, color: colors.darkViolet, fontWeight: '400' }}>Upload or capture network</Text>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center", margin: WIDTH * 0.04 }}>
                    <Pressable style={{ borderWidth: 0, backgroundColor: colors.grey, marginRight: WIDTH * 0.05, padding: 10, borderRadius: WIDTH * 0.02, width: WIDTH * 0.32, justifyContent: "center", alignItems: "center" }} /* onPress={galleryOpen} */  >
                        <Image source={gallery} resizeMode='contain' style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} />
                        <Text style={{ fontSize: 17 }}>Gallery</Text>
                    </Pressable>
                    <Pressable style={{ padding: 10, backgroundColor: colors.grey, borderRadius: WIDTH * 0.02, width: WIDTH * 0.32, justifyContent: "center", alignItems: "center" }} /* onPress={galleryOpen} */>
                        <Image source={camera} resizeMode='contain' style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} />
                        <Text style={{ fontSize: 17 }}>Camera</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default UploadComponent