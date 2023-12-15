// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const Navigation = useNavigation();

    useEffect(() => {
        const checkIfSignedUp = async () => {
            try {
                // Check if the user has signed up by looking for the email in AsyncStorage
                const userEmail = await AsyncStorage.getItem('email');

                if (userEmail) {
                    // User has signed up, check if it's a new user or an existing user
                    const isNewUser = await AsyncStorage.getItem('isNewUser');

                    if (isNewUser) {
                        // New user, navigate to the Get Started screen
                        Navigation.replace('GetStartedScreen');
                    } else {
                        // Existing user, navigate to the home screen
                        Navigation.replace('HomeScreen'); // Use replace to replace the splash screen in the stack
                    }
                } else {
                    // User has not signed up, navigate to the signup screen
                    Navigation.replace('SignUpScreen');
                }
            } catch (error) {
                console.error('Error checking signup status:', error);
            }
        };

        checkIfSignedUp();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <View>
            <Text>Splash Screen</Text>
            <ActivityIndicator />
        </View>
    );
};

export default SplashScreen;

