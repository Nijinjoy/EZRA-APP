import { View, Text, ImageBackground, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { drawerArrow, drawerProfile, drawerShade, drawingsIcon, evaluateIcon, faq } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const DATA = [
    {
        id: 1,
        title: 'Children',
        icon: drawerProfile,
        arrow: drawerArrow,
        path: 'ChildrenScreen'
    },
    {
        id: 2,
        title: 'Explore',
        icon: evaluateIcon,
        arrow: drawerArrow,
        path: 'EvaluateScreen'
    },
    {
        id: 3,
        title: 'Artworks',
        icon: drawingsIcon,
        arrow: drawerArrow
    },
    {
        id: 4,
        title: 'Faqs',
        icon: faq,
        arrow: drawerArrow,
        path: 'FaqScreen'
    },
    {
        id: 5,
        title: 'Contact an art therapist',
        icon: faq,
        arrow: drawerArrow,
        path: ' ContactScreen'
    },
    {
        id: 6,
        title: 'Wear your emotions',
        icon: evaluateIcon,
        arrow: drawerArrow
    },
    {
        id: 7,
        title: 'Order History',
        icon: evaluateIcon,
        arrow: drawerArrow,
        path: 'OrderHistoryScreen'
    },
]

const DrawerScreen = () => {
    const Navigation = useNavigation()
    return (
        <View style={{}}>
            <ImageBackground source={drawerShade} style={{ width: WIDTH * 0.749, height: HEIGHT * 0.25, backgroundColor: colors.lightBlue }} resizeMode='contain'>
                <View style={{ margin: HEIGHT * 0.04, position: 'absolute', bottom: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 18, color: colors.darkViolet }}>Aaliya Ahammed</Text>
                    <Text style={{ fontSize: 13, color: colors.lightGrey }}>aaliya@gmail.com</Text>
                </View>
            </ImageBackground >
            <View>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => Navigation.navigate(item.path)} style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', padding: HEIGHT * 0.025, borderWidth: 0 }}>
                                <View style={{ flex: 0.2 }}>
                                    <Image source={item.icon} style={{ width: WIDTH * 0.055, height: HEIGHT * 0.03 }} />
                                </View>
                                <View style={{ flex: 0.7, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, color: colors.darkViolet }}>{item.title}</Text>
                                </View>
                                <View style={{ flex: 0.1 }}>
                                    <Image source={item.arrow} style={{ width: WIDTH * 0.015, height: HEIGHT * 0.012 }} />
                                </View>
                            </Pressable>
                        )
                    }}
                />
                <View style={{ borderRadius: WIDTH * 0.01, width: WIDTH * 0.487, height: HEIGHT * 0.046, flexDirection: 'row', alignItems: "center", justifyContent: 'center', backgroundColor: colors.grey, marginHorizontal: WIDTH * 0.05 }}>
                    <View style={{ borderRadius: WIDTH * 0.01, backgroundColor: colors.white, flex: 0.5, justifyContent: "center", alignItems: 'center', padding: WIDTH * 0.02, margin: WIDTH * 0.005 }}>
                        <Text style={{ color: colors.darkViolet, fontSize: 13 }}>English</Text>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: "center", alignItems: 'center' }}>
                        <Text style={{ color: colors.darkViolet, fontSize: 13, textAlign: 'right' }}>Arabic</Text>
                    </View>
                </View>
                {/* logout */}
                <View style={{ borderWidth: 0.5, width: WIDTH * 0.22, height: HEIGHT * 0.04, justifyContent: "center", alignItems: 'center', borderRadius: WIDTH * 0.01, marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.04 }}>
                    <Text style={{ fontSize: 16, color: colors.darkViolet }}>Log out</Text>
                </View>
                {/* logout */}
            </View>

        </View >
    )
}


export default DrawerScreen