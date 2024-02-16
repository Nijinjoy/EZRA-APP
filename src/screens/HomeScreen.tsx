import { View, Text, Image, ImageBackground, Pressable, FlatList, Modal, Alert } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { camera, contact, drawerIcon, gallery, profile, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { CommonActions, DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { Api } from './Api'
import { SET_TOKEN } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import commonAction from '../redux/action/commonAction'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { userDetails, token, getUser } = useSelector((state) => state?.commonReducer);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buttonProps, setButtonProps] = useState({
        text: "Please select a child to view more details", backgroundColor: colors.shadowGrey, textColor: colors.darkViolet
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [galleryImage, setGalleryImage] = useState({ fileType: "", bucketName: "" })

    useEffect(() => {
        try {
            dispatch(commonAction.getUser(token))
        } catch (err) {
            console.log("err==>", err);
        }
    }, []);

    const onSelectItem = (index) => {
        setSelectedItem(index);
        setButtonProps({
            text: "Upload your child's network and explore it with them",
            backgroundColor: colors.darkViolet,
            textColor: colors.white
        });
    };

    const galleryOpen = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            includeExif: true,
        };
        launchImageLibrary(options, async (response) => {
            if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                if (response.assets && response.assets.length > 0) {
                    try {
                        const selectedImage = response.assets[0];
                        console.log("selectedImage===>", selectedImage);
                        const fileExtension = selectedImage.fileName.split('.').pop();
                        const fileType = `.${fileExtension}`;

                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                fileType: fileType,
                                bucketName: "esra-bucket-applab-2"
                            }),
                        };
                        console.log('Request Body:===>', requestOptions.body);

                        const res = await fetch(`${Api}/inference/generatePresignedUrl`, requestOptions);
                        const data = await res.json();
                        if (data.status) {
                            console.log("Pre-signed URL:===>", data);

                            const base64 = `data:${selectedImage.type};base64,${selectedImage.fileName}`;

                            console.log("base64====>", base64);
                            const blob = await (await fetch(base64)).blob();

                            // console.log("base64====>", base64);


                            // Upload the image using the obtained pre-signed URL
                            const uploadResponse = await fetch(data.url, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': selectedImage.type,
                                },
                                body: blob,
                                // body: selectedImage.fileName,
                            });
                            if (uploadResponse.status) {
                                console.log('Image uploaded ===>', uploadResponse.status);
                                Alert.alert('Successfully uploaded the image')
                            } else {
                                console.log('Failed to upload image:', uploadResponse.statusText);
                            }
                            // Upload the image using the obtained pre-signed URL
                        } else {
                            console.log('Failed to generate pre-signed URL:', data.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    setModalVisible(false);
                } else {
                    console.log('Image URI is undefined');
                }
            }
        });
    };


    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} imageWidth={WIDTH * 0.087} imageHeight={HEIGHT * 0.049} navigation={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            {getUser ? (
                <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                    <Text style={{ fontSize: 13, color: colors.lightGrey, fontWeight: '600' }}>Children's profiles</Text>
                    <FlatList
                        data={getUser}
                        numColumns={4}
                        contentContainerStyle={{ marginTop: HEIGHT * 0.01 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Pressable style={{ marginRight: WIDTH * 0.05, borderWidth: selectedItem === index ? 2 : 0, borderRadius: WIDTH * 0.02, borderColor: colors.titleColor }} onPress={() => onSelectItem(index)}>
                                <View style={{ borderWidth: 0, width: WIDTH * 0.19, height: HEIGHT * 0.108, borderRadius: WIDTH * 0.02, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGrey }}>
                                    <Image source={profile} resizeMode='contain' style={{ width: WIDTH * 0.06, height: HEIGHT * 0.05 }} />
                                    <Text style={{ fontSize: 16, color: colors.white }}>{item.name}</Text>
                                </View>
                            </Pressable>
                        )}
                    />
                    <Pressable
                        style={{
                            width: WIDTH * 0.9,
                            height: HEIGHT * 0.190,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: buttonProps.backgroundColor,
                            marginVertical: HEIGHT * 0.05,
                            borderRadius: WIDTH * 0.02,
                            borderWidth: 0.3,
                            borderColor: colors.borderColor
                        }} onPress={() => {
                            if (selectedItem !== null) {
                                setModalVisible(true);
                            }
                        }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Image source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, position: 'absolute' }} />
                            <Text style={{ fontSize: 12, width: WIDTH * 0.5, textAlign: 'center', color: buttonProps.textColor, }}>{buttonProps.text}</Text>
                        </View>
                    </Pressable>
                    <Modal
                        visible={modalVisible}
                        style={{ borderTopLeftRadius: WIDTH * 0.05 }}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <Pressable style={{ backgroundColor: colors.white, position: 'absolute', bottom: 0, width: WIDTH, height: HEIGHT * 0.28, flex: 1 }} onPress={() => setModalVisible(false)}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                <Text style={{ fontSize: 17, textAlign: "center" }}>Upload or capture drawing</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                    <Pressable style={{ borderWidth: 0, backgroundColor: colors.grey, marginRight: WIDTH * 0.05, padding: 10, borderRadius: WIDTH * 0.02 }} onPress={galleryOpen}>
                                        <Image source={gallery} resizeMode='contain' style={{ width: WIDTH * 0.2, height: HEIGHT * 0.1 }} />
                                        <Text>Gallery</Text>
                                    </Pressable>
                                    <Pressable style={{ padding: 10, backgroundColor: colors.grey, borderRadius: WIDTH * 0.02 }} /* onPress={cameraOpen} */>
                                        <Image source={camera} resizeMode='contain' style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} />
                                        <Text style={{ fontSize: 17 }}>Camera</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Pressable>
                    </Modal>
                </View>
            ) : (
                <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                    <Text style={{ fontSize: 13, color: colors.lightGrey, fontWeight: '600' }}>Welcome</Text>
                    <Text style={{ fontSize: 18, color: colors.violet }}>{userDetails.name}</Text>
                    <Pressable onPress={() => navigation.navigate('AddChildDrawer')}
                        style={{
                            width: WIDTH * 0.9,
                            height: HEIGHT * 0.190,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.darkViolet,
                            marginVertical: HEIGHT * 0.05,
                            borderRadius: WIDTH * 0.02,
                        }}>
                        <Image source={contact} style={{ width: WIDTH * 0.12, height: HEIGHT * 0.07 }} />
                        <Text style={{ fontSize: 12, color: colors.white, width: WIDTH * 0.4, textAlign: 'center', margin: HEIGHT * 0.01 }}>
                            Let's Start by adding your child information
                        </Text>
                    </Pressable>
                </View>
            )
            }
        </View >
    )
}


export default HomeScreen