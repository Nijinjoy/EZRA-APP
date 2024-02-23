import { View, Text, Image, ImageBackground, Pressable, FlatList, Modal, Alert, ScrollView } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { america, camera, contact, drawerIcon, gallery, profile, shadedIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimensions'
import { colors } from '../constants/Colors'
import { CommonActions, DrawerActions, useNavigation, useRoute } from '@react-navigation/native'
import { Api } from './Api'
import { SET_TOKEN } from '../redux/constants'
import { useDispatch, useSelector } from 'react-redux'
import commonAction from '../redux/action/commonAction'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { format } from 'date-fns';

const HomeScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const { userDetails, token, getUser, getPredictionListChild } = useSelector((state) => state?.commonReducer);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buttonProps, setButtonProps] = useState({
        text: "Please select a child to view more details", backgroundColor: colors.shadowGrey, textColor: colors.darkViolet
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [galleryImage, setGalleryImage] = useState({ fileType: "", bucketName: "" })
    const [imageResponse, setImageResponse] = useState({})
    const [childid, setChildId] = useState()
    const [url, setUrl] = useState({})

    console.log("ListChild===>", JSON.stringify(getPredictionListChild));

    useEffect(() => {
        try {
            dispatch(commonAction.getUser(token))
        } catch (err) {
            console.log("err==>", err);
        }
    }, []);

    const onSelectItem = (item) => {
        setSelectedItem(item);
        setButtonProps({
            text: "Upload your child's network and explore it with them",
            backgroundColor: colors.darkViolet,
            textColor: colors.white
        });
    };


    const galleryOpen = async () => {
        try {
            const selectedImage = await ImagePicker.openPicker({
                mediaType: 'photo',
                includeBase64: false,
                forceJpg: true
            });
            console.log("selectedImage==>", selectedImage);

            if (!selectedImage.path) {
                console.error('Selected image does not have a filename.');
                return;
            }
            const fileExtension = selectedImage.path.split('.').pop();
            const newExtension = fileExtension.toLowerCase() === 'heic' ? 'jpg' : fileExtension?.toLowerCase()
            const fileType = `.${newExtension}`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fileType: fileType,
                    bucketName: "esra-bucket-applab-2"
                }
                ),
            };
            const res = await fetch(`${Api}/inference/generatePresignedUrl`, requestOptions);
            const data = await res.json();
            // console.log("uploadUrl==>", data?.data);
            if (data.status) {
                console.log("data.status==>", data);
                setUrl(data?.data)
                await uploadImage(data?.data?.uploadUrl, selectedImage, data?.data?.downloadUrl);
            } else {
                console.log('Failed to generate pre-signed URL:', data.message);
            }
        } catch (error) {
            console.error('Error in galleryOpen:', error);
        }
    };

    const uploadImage = async (uploadUrl, selectedImage, downloadUrl) => {
        try {
            const blob = await fetch(selectedImage.path)
            const blobData = await blob.blob()

            const uploadResponse = await fetch(uploadUrl, {
                method: 'PUT',
                body: blobData,
            })
            console.log("Upload Response:==>", uploadResponse);
            if (uploadResponse?.status) {
                savePrediction(downloadUrl)
                dispatch(commonAction.getPredictionListChild(childid, token, "home"));
                Alert.alert('Image upload successful')
                setModalVisible(false)
            } else {
                console.log('Failed to upload image:', uploadResponse);
            }
        } catch (error) {
            console.error('Error in uploadImage:', error);
        }
    };

    const savePrediction = async (imagePath) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "childId": childid,
            "imagePath": imagePath,
        });
        console.log("row====?>", raw);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            const savepredictionResponse = await fetch("https://esra-dev.applab.qa/api/child/savePrediction", requestOptions);
            const savepredictionJson = await savepredictionResponse.json()
            console.log("savepredictionResponse==>", savepredictionJson);

            if (savepredictionResponse.status) {
                Alert.alert('sucesss')
                console.log("Prediction saved successfully");
            } else {
                console.error("Failed to save prediction:", savepredictionResponse);
            }
        } catch (error) {
            console.error("Error saving prediction:", error);
        }
    }

    const backgroundColors = [colors.lightGrey, colors.grey, colors.titleColor, colors.lightGrey, colors.grey];

    return (
        <View style={{ borderWidth: 0.5, borderColor: colors.lightBlue }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143 }}>
                <View style={{ marginTop: HEIGHT * 0.05 }}>
                    <HeaderComponent backArrow={drawerIcon} fontsize={20} imageWidth={WIDTH * 0.087} imageHeight={HEIGHT * 0.049} navigation={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                </View>
            </ImageBackground>
            {getUser ? (
                <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                    <Text style={{ fontSize: 13, color: colors.darkViolet, fontWeight: '600' }}>Children's profiles</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <FlatList
                            data={getUser}
                            contentContainerStyle={{ marginTop: HEIGHT * 0.01, flexDirection: 'row' }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index, }) => (
                                <Pressable style={{ borderRadius: WIDTH * 0.02, borderColor: colors.titleColor, borderWidth: selectedItem && selectedItem._id === item._id ? WIDTH * 0.003 : 0, padding: WIDTH * 0.01, marginRight: WIDTH * 0.02 }} onPress={() => {
                                    onSelectItem(item);
                                    // onSelectItem(childid)
                                    setChildId(item._id)
                                    dispatch(commonAction.getPredictionListChild(item._id, token, "home"))
                                    console.log("item-===>", item._id);
                                }}>
                                    <View style={{ width: WIDTH * 0.19, height: HEIGHT * 0.108, borderRadius: WIDTH * 0.02, justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColors[index % backgroundColors.length], }}>
                                        <Image source={profile} resizeMode='contain' style={{ width: WIDTH * 0.06, height: HEIGHT * 0.05 }} />
                                        <Text style={{ fontSize: 16, color: colors.white }}>{item.name}</Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: HEIGHT * 0.02 }}>
                        <Text style={{ fontSize: 16, color: colors.darkViolet }}>Latest Drawing</Text>
                        <Pressable onPress={() => navigation.navigate("DrawingsDrawer")}>
                            <Text style={{ fontSize: 12, color: colors.darkViolet }}>View all</Text>
                        </Pressable>
                    </View>
                    {getPredictionListChild && getPredictionListChild.data && getPredictionListChild.data[0] != null ? (
                        <Pressable
                            style={{
                                width: WIDTH * 0.89,
                                height: HEIGHT * 0.21,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: HEIGHT * 0.02,
                                borderRadius: WIDTH * 0.03,
                                // borderWidth: 0.3,
                                borderColor: colors.borderColor
                            }} onPress={() => {
                                if (!selectedItem) {
                                    return;
                                }
                                // navigation.navigate('DrawingOverviewDrawer');
                            }}>
                            <ImageBackground source={{ uri: getPredictionListChild?.data[0]?.imagePath }} style={{ width: WIDTH * 0.89, height: HEIGHT * 0.22, borderRadius: WIDTH * 0.04, justifyContent: "space-between" }} onError={(error) => console.log("Error loading image:", error)} >
                                <View style={{ backgroundColor: colors.lightBlack, width: WIDTH * 0.89, position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-between', shadowColor: colors.lightBlack, shadowOpacity: 0.2, shadowOffset: { width: 0, height: -3 } }}>
                                    <Text style={{ color: colors.white, marginHorizontal: WIDTH * 0.02, padding: WIDTH * 0.02 }}>
                                        {format(new Date(getPredictionListChild?.data[0]?.date), 'dd MMMM yyyy')}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={{
                                width: WIDTH * 0.9,
                                height: HEIGHT * 0.21,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: buttonProps.backgroundColor,
                                marginVertical: HEIGHT * 0.02,
                                borderRadius: WIDTH * 0.02,
                                borderWidth: 0.3,
                                borderColor: colors.borderColor
                            }} onPress={() => {
                                if (!selectedItem) {
                                    return;
                                }
                                setModalVisible(true);
                            }} >
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                <Image source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.143, position: 'absolute' }} />
                                <Text style={{ fontSize: 12, width: WIDTH * 0.5, textAlign: 'center', color: buttonProps.textColor, }}>{buttonProps.text}</Text>
                            </View>
                        </Pressable>
                    )}
                    <Modal
                        visible={modalVisible}
                        style={{ borderTopRightRadius: 20 }}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <Pressable style={{ backgroundColor: colors.white, position: 'absolute', bottom: 0, width: WIDTH, height: HEIGHT * 0.28, }} onPress={() => setModalVisible(false)}>
                            <View style={{ backgroundColor: 'white', margin: HEIGHT * 0.02 }}>
                                <Text style={{ fontSize: 17, textAlign: "center", padding: HEIGHT * 0.01 }}>Upload or capture drawing</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "center" }}>
                                    <Pressable style={{ borderWidth: 0, backgroundColor: colors.grey, marginRight: WIDTH * 0.05, padding: 10, borderRadius: WIDTH * 0.02, width: WIDTH * 0.32, justifyContent: "center", alignItems: "center" }} onPress={galleryOpen}>
                                        <Image source={gallery} resizeMode='contain' style={{ width: WIDTH * 0.15, height: HEIGHT * 0.1 }} />
                                        <Text style={{ fontSize: 17 }}>Gallery</Text>
                                    </Pressable>
                                    <Pressable style={{ padding: 10, backgroundColor: colors.grey, borderRadius: WIDTH * 0.02, width: WIDTH * 0.32, justifyContent: "center", alignItems: "center" }} onPress={galleryOpen}>
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


