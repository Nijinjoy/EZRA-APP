import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { cup, keyChain, shirt } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'

const PRODUCTS = [
    {
        id: 1,
        icon: cup,
        value: "Cup"
    },
    {
        id: 2,
        icon: keyChain,
        value: "KeyChain"
    },
    {
        id: 3,
        icon: shirt,
        value: "Shirt"
    },
]

const ChooseprdctComponent = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePress = (itemId) => {
        setSelectedItem(itemId);
    };

    return (
        <View style={{ borderRadius: HEIGHT * 0.01 }}>
            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => {
                    const isSelected = selectedItem === item.id;
                    return (
                        <Pressable onPress={() => handlePress(item.id)} style={{ margin: WIDTH * 0.02, backgroundColor: isSelected ? colors.blue : colors.white, borderRadius: HEIGHT * 0.01, borderWidth: 0.5, borderColor: colors.lightGrey }}>
                            <Image source={item.icon} style={{ width: WIDTH * 0.255, height: HEIGHT * 0.1, borderBottomLeftRadius: WIDTH * 0.01, borderBottomRightRadius: WIDTH * 0.01 }} />
                            <View style={{ margin: HEIGHT * 0.01 }}>
                                <Text style={{ textAlign: 'center', fontSize: 13, color: isSelected ? colors.white : colors.violet, fontWeight: '500' }}>{item.value}</Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View >
    )
}

export default ChooseprdctComponent