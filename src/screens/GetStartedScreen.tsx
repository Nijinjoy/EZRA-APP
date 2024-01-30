import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/Colors'
import { america, arrowIcon, blueIcon, bottomIntersection, cameraIcon, getstartedIcon, nextArrow, parabolicIcon, qatar, topIntersection } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import ButtonComponent from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import { setProfile, setToken } from '../redux/action/commonAction'
import { useDispatch } from 'react-redux'

const GetStartedScreen = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('EN');
    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <View style={{ flex: 1, backgroundColor: colors.lightWhite }}>
            <View style={{ position: 'absolute', top: HEIGHT * -0.06 }}>
                <Image source={topIntersection} style={{ width: WIDTH, height: HEIGHT * 0.128 }} resizeMode='contain' />
            </View>
            <View style={{ borderWidth: 0, width: WIDTH * 0.287, position: 'absolute', right: WIDTH * 0.08, marginTop: HEIGHT * 0.07, backgroundColor: colors.grey, borderRadius: WIDTH * 0.02, flexDirection: 'row', alignItems: "center", padding: 2 }}>
                <Pressable onPress={() => setSelectedLanguage('EN')} style={{ borderWidth: 0, margin: WIDTH * 0.008, width: WIDTH * 0.12, borderRadius: WIDTH * 0.01, justifyContent: "center", alignItems: 'center', flexDirection: 'row', backgroundColor: selectedLanguage === 'EN' ? colors.white : colors.grey, padding: HEIGHT * 0.005 }}>
                    <Image source={america} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.02 }} resizeMode='contain' />
                    <Text style={{}}>EN</Text>
                </Pressable>
                <Pressable onPress={() => setSelectedLanguage('AR')} style={{ borderWidth: 0, margin: WIDTH * 0.008, width: WIDTH * 0.12, borderRadius: WIDTH * 0.01, justifyContent: "center", alignItems: 'center', flexDirection: "row", backgroundColor: selectedLanguage === 'AR' ? colors.white : colors.grey }}>
                    <Image source={qatar} style={{ width: WIDTH * 0.06, height: HEIGHT * 0.02 }} resizeMode='contain' />
                    <Text>AR</Text>
                </Pressable>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Image source={cameraIcon} style={{ width: WIDTH * 0.155, height: HEIGHT * 0.074, position: 'absolute', left: WIDTH * 0.07, top: HEIGHT * 0.2 }} resizeMode='contain' />
                <Image source={parabolicIcon} style={{ width: WIDTH * 0.155, height: HEIGHT * 0.074, position: "absolute", right: WIDTH * 0.07, top: HEIGHT * 0.2 }} resizeMode='contain' />
                <Image source={arrowIcon} style={{ position: "absolute", width: WIDTH * 0.155, height: HEIGHT * 0.074, left: WIDTH * 0.07, top: HEIGHT * 0.5 }} resizeMode='contain' />
                <Image source={blueIcon} style={{ width: WIDTH * 0.155, height: HEIGHT * 0.074, position: "absolute", right: WIDTH * 0.15, top: HEIGHT * 0.5 }} resizeMode='contain' />

                <Image source={getstartedIcon} style={{ width: WIDTH * 0.563, height: HEIGHT * 0.462 }} resizeMode='contain' />
                <Text style={{ fontSize: 24, color: colors.violet, marginTop: HEIGHT * 0.02 }}>The Emotion Sensing</Text>
                <Text style={{ fontSize: 24, color: colors.violet }}>Recognition Application</Text>
                <View style={{ marginVertical: HEIGHT * 0.03 }}>
                    <ButtonComponent
                        //containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02 }}
                        //labelStyle={{ color: colors.white }}
                        icon={nextArrow}
                        label="Get Started"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    // onPress={() => dispatch(setProfile("Test"))}
                    />
                </View>
                <View style={{}}>
                    <ButtonComponent
                        containerStyle={{ backgroundColor: colors.white, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02, borderColor: colors.grey, borderWidth: 0.5 }}
                        labelStyle={{ color: colors.lightBlack }}
                        label="Sign in"
                        onPress={() => navigation.navigate('SignInScreen')}
                    />
                </View>
            </View>
            <View style={{ bottom: HEIGHT * -0.048, position: "absolute" }}>
                <Image source={bottomIntersection} style={{ width: WIDTH, height: HEIGHT * 0.128 }} resizeMode='contain' />
            </View>
        </View >
    )
}

export default GetStartedScreen