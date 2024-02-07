import { View, Text, SafeAreaView, StatusBar, Alert, Pressable, ImageBackground, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors'
import TextInputComponent from '../components/TextInputComponent';
import { backArrow, calender, nextArrow, shadedIcon } from '../assets/images';
import ButtonComponent from '../components/ButtonComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import addChild from '../redux/action/commonAction'
import commonAction from '../redux/action/commonAction';
import { useSelector } from 'react-redux';
import { Api } from './Api';


const AddChildScreen = () => {
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [childInfo, setChildInfo] = useState({ childname: '', gender: 'Male', dob: '', parentId: "" })
    const dispatch = useDispatch()

    console.log("childinfo===>", childInfo);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    };

    const handleDatePicked = (pickedDate) => {
        hideDatePicker();
        const day = pickedDate.getDate().toString().padStart(2, '0');
        const month = (pickedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = pickedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        setChildInfo(prevInfo => ({
            ...prevInfo,
            dob: formattedDate
        }));
    };

    const handleGenderPress = (selectedGender) => {
        setChildInfo(prevInfo => ({
            ...prevInfo,
            gender: selectedGender
        }));
    };

    const handleNameChange = (childname) => {
        setChildInfo(prevInfo => ({
            ...prevInfo,
            childname: childname
        }));
    };

    const handleAddChild = async () => {
        const { childname, gender, dob, parentId } = childInfo
        try {
            const response = await fetch(`${Api}/child/addChild`, {
                method: "POST",
                body: JSON.stringify({
                    childname: childname,
                    gender: gender,
                    dob: dob,
                    parentId: parentId
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.status) {
                dispatch(commonAction.addChild(childInfo));
                await AsyncStorage.setItem('childName', name);
                navigation.navigate('HomeScreen');
            } else {
                Alert.alert('Error', 'Failed to add child');
            }
        }
        catch (error) {
            console.error('Error adding child:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    }

    return (
        <View style={{ flex: 1, }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title="Add a Child" backArrow={backArrow} Width={WIDTH * 0.045} Height={HEIGHT * 0.022} navigation={() => navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.darkViolet, marginHorizontal: WIDTH * 0.05 }}>Now let's get to know your child more</Text>
                <View style={{ marginTop: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 15, color: colors.darkViolet, marginBottom: HEIGHT * 0.01 }}>Name</Text>
                    <TextInputComponent
                        placeholder="Name"
                        Width={WIDTH * 0.85}
                        onChangeText={handleNameChange}
                    />
                </View>
                <View style={{ alignSelf: 'flex-start', marginTop: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.07 }}>
                    <Text style={{ fontSize: 15, color: colors.darkViolet }}>Gender</Text>
                    <View style={{ flexDirection: 'row', marginTop: HEIGHT * 0.02 }}>
                        <Pressable onPress={() => handleGenderPress('Male')} style={{ borderWidth: 1, padding: HEIGHT * 0.01, borderRadius: WIDTH * 0.02, borderColor: colors.darkViolet, backgroundColor: childInfo.gender === 'Male' ? colors.darkViolet : colors.white }}>
                            <Text style={{ color: childInfo.gender === 'Male' ? 'white' : colors.darkViolet }}>Male</Text>
                        </Pressable>
                        <Pressable onPress={() => handleGenderPress('Female')} style={{ borderWidth: 1, padding: HEIGHT * 0.01, borderRadius: WIDTH * 0.02, marginHorizontal: WIDTH * 0.03, borderColor: colors.darkViolet, backgroundColor: childInfo.gender === 'Female' ? colors.darkViolet : colors.white }}>
                            <Text style={{ color: childInfo.gender === 'Female' ? 'white' : colors.darkViolet }}>Female</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ marginTop: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 15, color: colors.darkViolet, marginBottom: HEIGHT * 0.01 }}>Date of Birth</Text>
                    <Pressable onPress={showDatePicker} style={{ borderWidth: 1, width: WIDTH * 0.85, padding: HEIGHT * 0.02, borderRadius: WIDTH * 0.01, borderColor: colors.grey, flexDirection: 'row', justifyContent: "space-between" }}>
                        <Text style={{ color: colors.lightBlack }}>{childInfo.dob !== '' ? childInfo.dob : 'Choose a date'}</Text>
                        <Image source={calender} style={{ width: WIDTH * 0.04, height: HEIGHT * 0.02 }} resizeMode='contain' />
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDatePicked}
                        onCancel={hideDatePicker}
                    />
                </View>
                <View style={{ marginTop: HEIGHT * 0.27 }}>
                    <ButtonComponent
                        containerStyle={{ backgroundColor: colors.darkViolet, width: WIDTH * 0.85, height: HEIGHT * 0.072, borderRadius: WIDTH * 0.02, borderColor: colors.grey, borderWidth: 0.5 }}
                        label="Add a child"
                        icon={nextArrow}
                        labelStyle={{ color: colors.white }}
                        onPress={handleAddChild}
                    />
                </View>
            </View>
        </View>
    )
}

export default AddChildScreen


