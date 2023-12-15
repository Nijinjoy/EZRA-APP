import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/Dimensions';

const ModalComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <View style={styles.centerContent}>
                    <Text>Log out</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        borderWidth: 1,
        width: WIDTH * 0.8,
        height: HEIGHT * 0.3,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ModalComponent;
