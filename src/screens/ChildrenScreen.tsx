import { View, Text, SafeAreaView, Image, ImageBackground, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { addIcon, backArrow, contact, plusIcon, profileIcon, shadedIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const data1 = [
    {
        id: 1,
        name: 'Nijin',
        background: colors.skyBlue
    },
    {
        id: 2,
        name: 'Nijo',
        background: colors.titleColor
    },
    {
        id: 3,
        name: 'Ajo',
        background: colors.violet
    },
]


const ChildrenScreen = () => {
    const Navigation = useNavigation()
    const [childrenNames, setChildrenNames] = useState([]);

    useEffect(() => {
        const fetchChildrenNames = async () => {
            try {
                const storedNames = await AsyncStorage.getItem('childNames');
                if (storedNames) {
                    setChildrenNames(JSON.parse(storedNames));
                }
            } catch (error) {
                console.error('Error fetching children names:', error);
            }
        };
        fetchChildrenNames();
    }, []);


    const handleAddChild = async () => {
        try {
            const result = await Navigation.navigate('AddChildScreen', {
                title: 'Update Child',
                buttonText: 'Update',
            });
            if (result) {
                setChildrenNames((prevNames) => [...prevNames, result]);
                const updatedChildrenNames = [...childrenNames, result];
                await AsyncStorage.setItem('childNames', JSON.stringify(updatedChildrenNames))
            }
        } catch (error) {
            console.error('Error navigating to AddChildScreen:', error);
        }
    };

    return (
        <View style={{ flex: 1, margin: HEIGHT * 0.01 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.1 }}>
                <SafeAreaView style={{ marginTop: HEIGHT * 0.04 }}>
                    <HeaderComponent title="Children" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>

            </View>
        </View >
    )
}

export default ChildrenScreen


{/* <View style={{ justifyContent: "center", alignItems: "center", marginTop: HEIGHT * 0.05 }}>
<FlatList
    data={childrenNames}
    numColumns={2}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <View style={{ margin: WIDTH * 0.04 }}>
            <Pressable style={{ flexDirection: 'row', width: WIDTH * 0.32, height: HEIGHT * 0.18, justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: item.background, borderRadius: WIDTH * 0.02 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={contact} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.08 }} resizeMode='contain' />
                    <Text style={{ textAlign: 'center', marginTop: HEIGHT * 0.01, color: colors.white }}>{item.name}</Text>
                </View>
            </Pressable>
        </View>
    )}
/>
<Pressable onPress={handleAddChild} style={{ width: WIDTH * 0.32, height: HEIGHT * 0.18, backgroundColor: colors.grey, justifyContent: 'center', alignItems: 'center', marginHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.02, }}>
    <View style={{ padding: 5, borderRadius: WIDTH, width: WIDTH * 0.09, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }}>
        <Text style={{ fontSize: 25 }}>+</Text>
    </View>
</Pressable>
</View> */}