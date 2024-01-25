import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { cup, keyChain, shirt } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import axios from 'axios'


const ChooseprdctComponent = ({ productList, onSelect }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePress = (itemId) => {
        setSelectedItem(itemId);
        onSelect(itemId);
    };

    return (
        <View style={{ borderRadius: HEIGHT * 0.01 }}>
            <FlatList
                data={productList.data}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isSelected = selectedItem === item._id;
                    const { image, title_en, price } = item;
                    return (
                        <Pressable onPress={() => handlePress(item._id)} style={{ margin: WIDTH * 0.01, borderRadius: HEIGHT * 0.01, borderWidth: 0.5, borderColor: colors.lightGrey, backgroundColor: isSelected ? colors.blue : colors.white }}>
                            <Image source={{ uri: image }} style={{ width: WIDTH * 0.257, height: HEIGHT * 0.1, borderBottomLeftRadius: WIDTH * 0.01, borderBottomRightRadius: WIDTH * 0.01, margin: WIDTH * 0.008 }} resizeMode='cover' />
                            <View style={{ margin: HEIGHT * 0.01 }}>
                                <Text style={{ textAlign: 'center', fontSize: 13, color: isSelected ? colors.white : colors.violet, fontWeight: '500' }}>
                                    {title_en}
                                </Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View >
    )
}

export default ChooseprdctComponent