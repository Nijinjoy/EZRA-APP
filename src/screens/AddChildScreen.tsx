import { View, Text, SafeAreaView, StatusBar, Alert, Pressable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors'
import TextInputComponent from '../components/TextInputComponent';
import PasswordComponent from '../components/PasswordComponent';
import { backArrow, calender, nextArrow, shadedIcon } from '../assets/images';
import ButtonComponent from '../components/ButtonComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GenderComponent from '../components/GenderComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddChildScreen = () => {
    const route = useRoute();
    const { title, buttonText, isNewChild } = route.params || {};
    const Navigation = useNavigation()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [childInfo, setChildInfo] = useState({ name: '', gender: 'Male', dateOfBirth: '' });

    console.log("childInfo==>", childInfo);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    useEffect(() => {
        if (isNewChild) {
            setChildInfo({ name: '', gender: 'Male', dateOfBirth: '' });
        }
    }, [isNewChild]);

    const handleDatePicked = (pickedDate) => {
        hideDatePicker();
        const day = pickedDate.getDate().toString().padStart(2, '0');
        const month = (pickedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = pickedDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setChildInfo(prevInfo => ({
            ...prevInfo,
            dateOfBirth: formattedDate
        }));
    };

    const handleGenderPress = (selectedGender) => {
        setChildInfo(prevInfo => ({
            ...prevInfo,
            gender: selectedGender
        }));
    };

    const handleNameChange = (name) => {
        setChildInfo(prevInfo => ({
            ...prevInfo,
            name: name
        }));
    };

    const handleAddChild = async () => {
        try {
            await AsyncStorage.setItem('childName', childInfo.name);
            await AsyncStorage.setItem('childGender', childInfo.gender);
            await AsyncStorage.setItem('childDateOfBirth', childInfo.dateOfBirth);
            Navigation.navigate('ChildrenScreen', { childName: childInfo.name })

            if (route.params?.isNewChild) {
                setChildInfo({ name: '', gender: 'Male', dateOfBirth: '' });
            }
        } catch (error) {
            console.error("Error storing child information:", error);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={shadedIcon} style={{ width: WIDTH, height: HEIGHT * 0.15 }}>
                <SafeAreaView>
                    <HeaderComponent title={title || "Add a Child"} backArrow={backArrow} navigation={() => Navigation.goBack()} fontsize={18} />
                </SafeAreaView>
            </ImageBackground>
            <View style={{ marginHorizontal: WIDTH * 0.07 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.darkViolet, }}>Now let's get to know your child more</Text>
                <View style={{ marginTop: HEIGHT * 0.03 }}>
                    <Text style={{ fontSize: 15, color: colors.darkViolet, marginBottom: HEIGHT * 0.01 }}>Name</Text>
                    <TextInputComponent
                        placeholder="Name"
                        width={WIDTH * 0.85}
                        onChangeText={handleNameChange}
                    />
                </View>
                <View style={{ alignSelf: 'flex-start', marginTop: HEIGHT * 0.02 }}>
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
                    <Pressable onPress={showDatePicker}>
                        <TextInputComponent
                            value={childInfo.dateOfBirth}
                            width={WIDTH * 0.85}
                            placeholder="Choose a date"
                            icon={calender}
                            isTextEnabled={false}
                            onPress={showDatePicker}
                        />
                    </Pressable>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDatePicked}
                        onCancel={hideDatePicker}
                    />
                </View>
                <ButtonComponent
                    background={colors.darkViolet}
                    text={buttonText || "Add a child"}
                    nextarrow={nextArrow}
                    textColor={colors.white}
                    Bottom={HEIGHT * 0.26}
                    width={WIDTH * 0.85}
                    navigate={handleAddChild}
                />
            </View>
        </View>
    )
}

export default AddChildScreen

