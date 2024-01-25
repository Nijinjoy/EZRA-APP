import { View, Text, ImageBackground, SafeAreaView, FlatList, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { backArrow, minus, plusIcon, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import axios from 'axios'
import HeaderComponent from '../components/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors } from '../constants/Colors'


const FaqScreen = () => {
    const Navigation = useNavigation()
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://hbkuesra.herokuapp.com/api/faq/getFAQs');
                setFaqData(response.data.faqs);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching FAQ data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleQuestionPress = (id) => {
        setSelectedQuestion(selectedQuestion === id ? null : id);
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="FAQ" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ flex: 1, marginTop: 0 }}>
                <FlatList
                    data={faqData}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => handleQuestionPress(item._id)} style={{ borderWidth: 0, margin: WIDTH * 0.03, marginHorizontal: WIDTH * 0.05 }}>
                                <View style={{ flexDirection: 'row', width: WIDTH }}>
                                    <View style={{ flex: 0.85 }}>
                                        <Text style={{ fontSize: 15, color: colors.titleColor, fontWeight: '500' }}>{item.title}</Text>
                                    </View>
                                    <Pressable style={{ flex: 0.15 }}>
                                        <Image source={selectedQuestion === item._id ? minus : plusIcon} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.02 }} />
                                    </Pressable>
                                </View>
                                {selectedQuestion === item._id && (
                                    <View style={{ marginTop: HEIGHT * 0.02 }}>
                                        <Text style={{ color: colors.titleColor, fontSize: 14, marginHorizontal: WIDTH * 0.02, textAlign: 'left' }}>{item.content}</Text>
                                    </View>
                                )}
                            </Pressable>
                        )
                    }}
                />
            </View>
        </View >
    )
}

export default FaqScreen

