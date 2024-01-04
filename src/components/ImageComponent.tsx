import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { launchImageLibrary } from 'react-native-image-picker';

const ImageComponent = ({ onSelectImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const onSelect = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
                console.log("imageResponse==>", selectedImage);
            }
        });
    };

    return (
        <View style={{ borderWidth: 1, borderColor: colors.grey, flexDirection: 'row', borderRadius: WIDTH * 0.02, overflow: 'hidden' }}>
            <View style={{ flex: 0.7, margin: HEIGHT * 0.015, justifyContent: 'center', alignItems: "center", position: 'relative' }}>
                <Text style={{ fontSize: 17, color: colors.darkViolet, height: HEIGHT * 0.03 }}>{selectedImage}</Text>
            </View>
            <Pressable style={{ flex: 0.3, backgroundColor: colors.darkViolet, borderRadius: WIDTH * 0.02, justifyContent: 'center', alignItems: 'center' }} onPress={onSelect}>
                <Text style={{ fontSize: 15, color: colors.white, fontWeight: "600" }}>Choose</Text>
            </Pressable>
        </View>
    )
}

export default ImageComponent