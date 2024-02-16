import { View, Text, ImageBackground, SafeAreaView, ScrollView, Pressable, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/Colors'
import { artwork, backArrow, draw1, equal, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './Api'
import ToggleComponent from '../components/ToggleComponent'


const Drawings2 = [
    {
        id: 1,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Positive',
        date: "12 September 2023"
    },
    {
        id: 2,
        icon: artwork,
        name: 'Maya',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
    {
        id: 3,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
    {
        id: 4,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
    {
        id: 5,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
    {
        id: 6,
        icon: draw1,
        name: 'Dave',
        percentage: "80%",
        status: 'Negative',
        date: "12 September 2023"
    },
]



const DrawingsScreen = () => {
    const Navigation = useNavigation()
    const [selectionMode, setSelectionMode] = useState('column');

    const onSelectRow = () => {

    }

    const onSelectColumn = () => {

    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Drawings" backArrow={backArrow} imageWidth={WIDTH * 0.045} imageHeight={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <Pressable style={{ alignItems: 'flex-end', marginHorizontal: WIDTH * 0.05 }}>
                <View style={{ borderWidth: 1, width: WIDTH * 0.2, padding: WIDTH * 0.02, borderColor: colors.grey, borderRadius: WIDTH * 0.01, backgroundColor: colors.grey, flexDirection: 'row' }}>
                    <Pressable style={{ padding: WIDTH * 0.02, backgroundColor: colors.white }} onPress={onSelectRow}  >
                        <Image source={equal} />
                    </Pressable>
                    <Pressable style={{ padding: WIDTH * 0.02, backgroundColor: colors.white, marginHorizontal: 5 }} onPress={onSelectColumn}  >
                        <Image source={equal} />
                    </Pressable>
                </View>
            </Pressable>

            {/* <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={Drawings2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ borderWidth: 0, marginVertical: HEIGHT * 0.0, flexDirection: 'row' }}>
                                <View style={{ marginVertical: HEIGHT * 0.01, }}>
                                    <Image source={item.icon} style={{ width: WIDTH * 0.4, height: HEIGHT * 0.15, borderRadius: WIDTH * 0.02 }} />
                                </View>
                                <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02 }}>
                                    <Text style={{ fontSize: 14, color: colors.darkViolet }}>{item.name}</Text>
                                    <Text style={{ fontSize: 40, color: colors.darkViolet }}>{item.percentage}</Text>
                                    <Text style={{ fontSize: 16, color: colors.orange }}>{item.status}</Text>
                                    <Text style={{ fontSize: 13, color: colors.darkViolet }}>12 March 2023</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </ScrollView> */}

            {/* <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={Drawings2}
                    numColumns={2}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ borderWidth: 0, marginHorizontal: WIDTH * 0.03, marginVertical: HEIGHT * 0.01 }}>
                                <Image source={item.icon} style={{ width: WIDTH * 0.4, height: HEIGHT * 0.15, borderRadius: WIDTH * 0.02 }} />
                            </View>
                        )
                    }}
                />
            </ScrollView> */}

            <ScrollView style={{ marginHorizontal: WIDTH * 0.05 }} showsVerticalScrollIndicator={false}>
                {selectionMode === 'column' && (
                    <FlatList
                        data={Drawings2}
                        numColumns={2}
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ borderWidth: 0, marginHorizontal: WIDTH * 0.03, marginVertical: HEIGHT * 0.01 }}>
                                    <Image source={item.icon} style={{ width: WIDTH * 0.4, height: HEIGHT * 0.15, borderRadius: WIDTH * 0.02 }} />
                                </View>
                            );
                        }}
                    />
                )}
            </ScrollView>

        </View >
    )
}


export default DrawingsScreen


// renderItem = {({ item }) => (
//     <View style={{ flexDirection: "row", borderRadius: WIDTH * 0.03 }}>
//         <View style={{ marginVertical: HEIGHT * 0.02, }}>
//             <Image source={item.icon} style={{ width: WIDTH * 0.3, height: HEIGHT * 0.15, borderRadius: WIDTH * 0.02 }} />
//         </View>
//         <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.02 }}>
//             <Text style={{ fontSize: 14, color: colors.darkViolet }}>{item.name}</Text>
//             <Text style={{ fontSize: 40, color: colors.darkViolet }}>{item.percentage}</Text>
//             <Text style={{ fontSize: 16, color: colors.orange }}>{item.status}</Text>
//             <Text style={{ fontSize: 13, color: colors.darkViolet }}>12 March 2023</Text>
//         </View>
//     </View>
// )}