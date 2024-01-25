import { View, Text, SafeAreaView, Image, ImageBackground, Pressable, ScrollView, Modal } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { camera, contact, drawerIcon, gallery, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import LanguagComponent from '../components/LanguagComponent'
import ModalComponent from '../components/ModalComponent'
import LogoutModalComponent from '../components/LogoutModalComponent'
import { Api } from './Api'

const HomeScreen = () => {
    const route = useRoute()
    const Navigation = useNavigation()
    const { childInfo } = route.params || {};
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState([]);


    // const getUser = async () => {
    //     try {
    //         const response = await fetch(`${Api}/user/getUser`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (response.ok) {
    //             const responseData = await response.json();
    //             if (responseData.status) {
    //                 const userData = responseData.data;
    //                 setUserData(userData);
    //                 console.log("userData==>", userData);
    //             } else {
    //                 console.error('API Error:', responseData.message);
    //             }
    //         } else {
    //             console.error('Failed to fetch user data');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }
    // };

    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, borderWidth: 0 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} Width={WIDTH * 0.087} Height={HEIGHT * 0.049} navigation={() => Navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <View style={{ borderWidth: 0 }}>
                    <Text style={{ fontSize: 13, color: colors.lightGrey, fontWeight: "600" }}>Welcome</Text>
                    <Text style={{ fontSize: 18, color: colors.darkViolet }}>Nijin</Text>
                </View>

                <Pressable onPress={Navigation.navigate('AddChildScreen')} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.190, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkViolet, marginVertical: HEIGHT * 0.05, borderRadius: WIDTH * 0.02 }}>
                    <Image source={contact} style={{ width: WIDTH * 0.12, height: HEIGHT * 0.07 }} />
                    <Text style={{
                        fontSize: 12, color: colors.white, width: WIDTH * 0.4, textAlign: 'center', margin: HEIGHT * 0.01
                    }}>Let's Start by adding your child information</Text>
                </Pressable>
            </View>

            <Modal visible={isModalVisible} animationType="slide" transparent >
                <Pressable style={{ flex: 1 }} /* onPress={closeModal} */  >
                    <View style={{ backgroundColor: colors.white, borderWidth: 0, borderTopLeftRadius: WIDTH * 0.05, borderTopRightRadius: WIDTH * 0.05, justifyContent: 'flex-end', alignItems: "center", position: 'absolute', bottom: 0, width: WIDTH }}>
                        <View style={{ position: 'absolute', top: HEIGHT * 0.01, right: WIDTH * 0.05 }}>
                            <Text style={{ fontSize: 25 }}>*</Text>
                        </View>
                        <Text style={{ textAlign: "center", fontSize: 17, marginTop: 20 }}>Upload or capture network</Text>
                        <View style={{ flexDirection: 'row', padding: HEIGHT * 0.03, justifyContent: 'center', alignItems: 'center', pointerEvents: 'box-none' }}>
                            <Pressable /* onPress={openGallery} */ style={{ padding: WIDTH * 0.07, backgroundColor: colors.grey, borderRadius: WIDTH * 0.02, marginRight: WIDTH * 0.05 }}>
                                <Image source={gallery} style={{ width: WIDTH * 0.11, height: HEIGHT * 0.062 }} />
                                <Text style={{ color: colors.darkViolet }}>Gallery</Text>
                            </Pressable>
                            <Pressable /* onPress={openCamera} */ style={{ backgroundColor: colors.grey, padding: WIDTH * 0.07, justifyContent: 'center', alignItems: "center", borderRadius: WIDTH * 0.02 }}>
                                <Image source={camera} style={{ width: WIDTH * 0.097, height: HEIGHT * 0.056 }} />
                                <Text style={{ color: colors.darkViolet }}>Camera</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>

        </View >
    )
}

export default HomeScreen