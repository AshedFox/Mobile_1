import React from 'react';
import AppText from "./AppText";
import {StyleSheet, View} from "react-native";
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";

const Satiety = observer(() => {
    const {satiety} = useGameStore();

    return (
        <View style={styles.container}>
            <AppText variation={"dark"} style={styles.title}>Satiety</AppText>
            <AppText variation={"dark"} style={styles.value}>{satiety}</AppText>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    title: {
        fontSize: 20,
        marginRight: 20
    },
    value: {
        fontSize: 20,
        fontWeight: "700",
    }
})

export default Satiety;
