import { View, Text, SafeAreaView, Image, ImageBackground, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { addIcon, backArrow, contact, plusIcon, profileIcon, shadedIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        <View style={{ flex: 1 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <View style={{ marginTop: HEIGHT * 0.04 }}>
                    <HeaderComponent title="Children" backArrow={backArrow} navigation={() => Navigation.goBack()} fontsize={18} />
                </View>
            </ImageBackground>
            <View style={{ borderWidth: 0 }}>
                <View style={{ marginHorizontal: WIDTH * 0.05, flexDirection: "row" }}>
                    <FlatList
                        style={{ flexGrow: 0.5 }}
                        data={childrenNames}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable style={{ alignItems: 'center', borderWidth: 0 }} onPress={() => Navigation.navigate('AddChildScreen', { title: 'Update Child', buttonText: 'Update' })}>
                                <View style={{ width: WIDTH * 0.2, height: HEIGHT * 0.11, borderRadius: HEIGHT, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGrey }} >
                                    <Image source={profileIcon} resizeMode='contain' style={{ width: WIDTH * 0.08 }} />
                                </View>
                                <Text style={{ fontSize: 18, color: colors.darkViolet, marginVertical: HEIGHT * 0.01 }}>{item}</Text>
                            </Pressable >
                        )}
                    />
                    <Pressable onPress={handleAddChild} style={{ width: WIDTH * 0.2, height: HEIGHT * 0.11, borderRadius: HEIGHT, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.skyBlue }}>
                        <Text style={{ fontSize: 30 }} >+</Text >
                    </Pressable>
                </View>
            </View>
        </View>
    )
}


export default ChildrenScreen



