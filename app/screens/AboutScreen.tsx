import React from 'react';
import {StyleSheet, View} from "react-native";
import colors from "../constants/colors";
import AppText from "../components/AppText";
import Icon from "react-native-vector-icons/Ionicons";

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Icon name={"information-circle-outline"} style={styles.icon}/>
            <AppText variation={"dark"} style={styles.text}>Написал Махнач Арсений, группа 951002</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    icon: {
        fontSize: 192,
        marginBottom: 30,
        color: colors.secondary
    },
    text: {
        fontSize: 18,
        color: colors.secondary
    }
})

export default AboutScreen;
