import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/Dimensions';
import { colors } from '../constants/Colors';
import PressbtnComponent from './PressbtnComponent';

const ModalComponent = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0.5 }}>
            <View style={{ borderWidth: 0.5, padding: HEIGHT * 0.05, backgroundColor: colors.grey, borderRadius: WIDTH * 0.015 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.titleColor, fontSize: 18 }}>Log out</Text>
                    <Text style={{ color: colors.lightGrey }}>Are you sure want to logout</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 20 }} >
                    <PressbtnComponent />
                    <PressbtnComponent />
                </View>
            </View>
        </View >
    );
};

export default ModalComponent;