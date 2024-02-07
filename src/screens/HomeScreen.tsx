import { View, Text, SafeAreaView, Image, ImageBackground, Pressable, ScrollView, Modal, StyleSheet } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { camera, contact, drawerIcon, gallery, profile, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { CommonActions, DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { Api } from './Api'
import { SET_TOKEN } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { userDetails, addChild } = useSelector((state) => state?.commonReducer);
    const [user, setUser] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${Api}/user/getUser`);
                if (response.status) {
                    throw new Error('failed to fetch data');
                }
                const responseData = await response.json();
                setUser(responseData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    const childViewStyles = addChild ? styles.childView : null;
    const welcomeText = addChild ? "Children Profiles" : "Welcome";

    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} Width={WIDTH * 0.087} Height={HEIGHT * 0.049} navigation={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <Text style={{ fontSize: 13, color: colors.lightGrey, fontWeight: "600" }}>
                    {!addChild ? "Children Profiles" : "Welcome"}
                </Text>
                <Text style={{ fontSize: 18, color: colors.violet }}>{userDetails.name}</Text>
                <Pressable onPress={() => navigation.navigate('AddChildDrawer')} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.190, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkViolet, marginVertical: HEIGHT * 0.05, borderRadius: WIDTH * 0.02 }}>
                    <Image source={contact} style={{ width: WIDTH * 0.12, height: HEIGHT * 0.07 }} />
                    <Text style={{
                        fontSize: 12, color: colors.white, width: WIDTH * 0.4, textAlign: 'center', margin: HEIGHT * 0.01
                    }}>Let's Start by adding your child information</Text>
                </Pressable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    childView: {
        width: WIDTH * 0.2,
        height: HEIGHT * 0.1,
        borderRadius: WIDTH * 0.02,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 6,
        backgroundColor: colors.orange
    },

    addChildButton: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.190,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkViolet,
        marginVertical: HEIGHT * 0.05,
        borderRadius: WIDTH * 0.02
    },
    addChildButtonWithChild: {
        backgroundColor: "#EFF3F8",
        borderWidth: 0.5
    },
    buttonText: {
        fontSize: 12,
        color: colors.lightBlack,
        width: WIDTH * 0.4,
        textAlign: 'center',
        margin: HEIGHT * 0.01
    }
})

export default HomeScreen

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await fetch(`${Api}/user/getUser`);
//             if (response.status) {
//                 throw new Error('Failed to fetch data');
//             }
//             const responseData = await response.json();
//             setUser(responseData.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//     fetchData();
// }, []);


{/* {addChild &&
                    <View style={[styles.childView, childViewStyles]}>
                        <Image source={profile} resizeMode='contain' style={{ width: WIDTH * 0.08, height: HEIGHT * 0.05 }} />
                        <Text style={{ fontSize: 18, marginTop: HEIGHT * 0.01, color: colors.white }}>{addChild.childname}</Text>
                    </View>
                } */}