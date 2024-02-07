import { View, Text, SafeAreaView, ImageBackground, Pressable, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { addIcon, backArrow, contact, plusIcon, profile, profileIcon, shadedIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

const ChildrenScreen = () => {
    const Navigation = useNavigation()
    const { addChild } = useSelector((state) => state?.commonReducer);


    return (
        <View style={{ margin: HEIGHT * 0.01, flex: 1 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.1 }}>
                <SafeAreaView style={{ marginTop: HEIGHT * 0.04 }}>
                    <HeaderComponent title="Children" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: HEIGHT * 0.2 }}>
                <View style={{ borderWidth: 0, alignItems: "center", justifyContent: 'center', width: WIDTH * 0.32, height: HEIGHT * 0.19, borderRadius: WIDTH * 0.02, backgroundColor: colors.orange }}>
                    <Image source={profile} style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} resizeMode='contain' />
                    <Text style={{ color: colors.white, fontSize: 15, margin: HEIGHT * 0.01 }}>{addChild.childname}</Text>
                </View>

            </View>
        </View>
    )
}


export default ChildrenScreen

{/* <View style={{ borderWidth: 0, alignItems: "center", justifyContent: 'center', width: WIDTH * 0.32, height: HEIGHT * 0.19, borderRadius: WIDTH * 0.02, backgroundColor: colors.orange }}>
<Image source={profile} style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} resizeMode='contain' />
<Text style={{ color: colors.white, fontSize: 15, margin: HEIGHT * 0.01 }}>{addChild.childname}</Text>
</View> */}

// const [childrenNames, setChildrenNames] = useState([]);


// useEffect(() => {
//     const fetchChildrenNames = async () => {
//         try {
//             const storedNames = await AsyncStorage.getItem('childNames');
//             if (storedNames) {
//                 setChildrenNames(JSON.parse(storedNames));
//             }
//         } catch (error) {
//             console.error('Error fetching children names:', error);
//         }
//     };
//     fetchChildrenNames();
// }, []);


// const handleAddChild = async () => {
//     try {
//         const result = await Navigation.navigate('AddChildScreen', {
//             title: 'Update Child',
//             buttonText: 'Update',
//         });
//         if (result) {
//             setChildrenNames((prevNames) => [...prevNames, result]);
//             const updatedChildrenNames = [...childrenNames, result];
//             await AsyncStorage.setItem('childNames', JSON.stringify(updatedChildrenNames))
//         }
//     } catch (error) {
//         console.error('Error navigating to AddChildScreen:', error);
//     }
// };


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