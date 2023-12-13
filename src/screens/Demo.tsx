import { View, Text, Image, StatusBar, ImageBackground, Platform, Pressable, Alert } from "react-native";
import React, { useEffect, useState, version } from "react";
import PropTypes from "prop-types"
import { getVersion } from 'react-native-device-info'

import { useDispatch, useSelector } from "react-redux";
import AzureAuth from 'react-native-azure-auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url, urlEndPoints } from "../http/api.Config";
import { networkApi } from "../http/api";
import { colors } from "../constants/colors";
import { logo, microsoft, vector, vectorTwo } from "../assets/images";
import { HEIGHT, WIDTH } from "../constants/dimensions";
import { commonStyle } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";


const SplashScreen = ({ navigation }, context) => {
    const [{ lang }] = useSelector(state => [state.i18nState, state.commonReducer,]);
    const [version, setVersion] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        checkUserLoggedIn()
        getVersionInfo();
    }, [])

    const checkUserLoggedIn = async () => {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
            setLoggedIn(true);
            // navigation.replace(Platform.isPad ? "Tab" : "Drawer");
            navigation.replace("MainScreen");
        }
        else {
            navigation.replace("LoginScreen")
        }
    };


    const getVersionInfo = async () => {
        let version = getVersion();
        console.log("version==>", version);
        try {
            const apiUrl = `${url.apiUrl}${urlEndPoints.version}`;
            const requestData = {
                os_type: Platform.OS === "android" ? "android" : "ios",
                version: version
            };
            const response = await networkApi(apiUrl, "POST", requestData);
            console.log("API responsing:", response.data);

            if (response?.status) {
                const versionData = response.data;
                if (versionData.update_required) {
                    setVersion(versionData?.major_version)
                }
            }
        } catch (error) {
            console.log("version_error", error);
        }
    };

    // useEffect(() => {
    //   getVersionInfo();
    // }, []);
    return (
        <View
            style={{ flex: 1, backgroundColor: colors.maroon }}>
            <StatusBar hidden={true} />

            <ImageBackground source={Platform.isPad ? vectorTwo : vector} resizeMode="cover" style={{ flex: 1 }} imageStyle={{ height: HEIGHT * 0.4 }}>
                <View style={{ alignItems: "center", position: "absolute", top: HEIGHT * 0.32, left: 0, right: 0 }}>
                    <Image source={logo} />
                </View>
            </ImageBackground>

            <View style={{ alignItems: "center", marginVertical: HEIGHT * 0.03 }}>
                <Text style={{ color: colors.white, fontWeight: "bold", fontSize: 13 }}>{context.t("version")} {version} </Text>
                <Text style={{ color: colors.grey, fontSize: 13, paddingVertical: HEIGHT * 0.012 }}>{context.t("katara_hospitality")}</Text>
            </View>
        </View>
    );
};

SplashScreen.contextTypes = {
    t: PropTypes.func
}

export default SplashScreen;





