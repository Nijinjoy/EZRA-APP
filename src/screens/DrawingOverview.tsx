import { View, Text, SafeAreaView, ImageBackground, FlatList, Image, Pressable, Switch } from 'react-native'
import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { details, dot, home, prediction, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const DATA = [
    {
        id: 1,
        data: 'Your child is very happy'
    },
    {
        id: 2,
        data: 'Your child said this drawing has a story'
    },
    {
        id: 3,
        data: 'This was drawn individually'
    },
    {
        id: 4,
        data: 'This was a spontaneous drawing'
    },
    {
        id: 5,
        data: 'Your child is very happy'
    }
]

const DrawingOverview = () => {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent
                        backArrow={home}
                        title="Drawing Overview"
                        fontsize={20}
                        imageWidth={WIDTH * 0.085}
                        imageHeight={HEIGHT * 0.03}
                        navigation={() => navigation.goBack()}
                    />
                </View>
            </ImageBackground>
            <View style={{ marginHorizontal: WIDTH * 0.05, marginVertical: HEIGHT * 0.05, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Image source={prediction} style={{ width: WIDTH * 0.382, height: HEIGHT * 0.207 }} />

                    <View style={{ borderWidth: 0, flexDirection: 'row', borderRadius: WIDTH * 0.05, padding: WIDTH * 0.01, alignItems: 'center', backgroundColor: colors.grey, width: WIDTH * 0.34, marginVertical: HEIGHT * 0.02 }}>
                        <Text style={{ fontSize: 12, color: colors.darkViolet, marginLeft: WIDTH * 0.01 }}>Heatmap</Text>
                        <Image source={details} style={{ marginHorizontal: WIDTH * 0.01 }} resizeMode='cover' />
                        <Switch
                            trackColor={{ false: colors.grey, true: colors.darkViolet }}
                            thumbColor={isEnabled ? colors.white : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginHorizontal: WIDTH * 0.05 }}>
                    <Text style={{ fontSize: 48, }}>80%</Text>
                    <Text style={{ fontSize: 16, color: colors.red }}>Highly positive</Text>
                    <Text style={{ fontSize: 13, width: WIDTH * 0.425, color: colors.darkViolet, marginTop: HEIGHT * 0.01 }}>Your child's drawing shows highly positive emotions</Text>
                </View>
            </View>

            <View style={{ borderWidth: 0.5, marginHorizontal: WIDTH * 0.05, borderColor: colors.grey }} />

            <View style={{ marginHorizontal: WIDTH * 0.05, marginTop: HEIGHT * 0.05 }}>
                <Text style={{ fontSize: 16, color: colors.darkViolet }}>Drawing Summary</Text>
                <FlatList
                    data={DATA}
                    contentContainerStyle={{ marginVertical: HEIGHT * 0.02 }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: HEIGHT * 0.02 }}>
                                <Image source={dot} style={{ width: WIDTH * 0.02, height: HEIGHT * 0.01 }} />
                                <Text style={{ fontSize: 13, color: colors.darkViolet, marginLeft: WIDTH * 0.03 }}>{item.data}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default DrawingOverview