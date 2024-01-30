import { View, Text, SafeAreaView, Image, ImageBackground, Pressable, ScrollView, Modal } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { camera, contact, drawerIcon, gallery, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { Api } from './Api'
import { SET_TOKEN } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import { useReducer } from 'react'
import commonReducer from '../redux/reducer/commonReducer'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState([]);
    const { userDetails, addChild } = useSelector((state) => state?.commonReducer)

    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, borderWidth: 0 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} Width={WIDTH * 0.087} Height={HEIGHT * 0.049} navigation={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <View style={{ borderWidth: 0 }}>
                    {/* {userDetails.name && <Text style={{ fontSize: 18, color: colors.darkViolet }}>{`Welcome, ${userDetails.name}`}</Text>}
                    {children.length > 0 && (
                        <ScrollView horizontal>
                            {children.map((child, index) => (
                                <Text key={index}>{child.name}</Text>
                            ))}
                        </ScrollView>
                    )} */}
                    <Text style={{ fontSize: 13, color: colors.lightGrey, fontWeight: "600" }}>Welcome</Text>
                    <Text style={{ fontSize: 18, color: colors.darkViolet }}>{userDetails.name}</Text>
                </View>

                <Pressable onPress={() => navigation.navigate('AddChildDrawer')} style={{ width: WIDTH * 0.9, height: HEIGHT * 0.190, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkViolet, marginVertical: HEIGHT * 0.05, borderRadius: WIDTH * 0.02 }}>
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