import React, {useEffect, useRef} from 'react';
import ResultsModal from "../components/ResultsModal";
import {Animated, Easing, StyleSheet, View} from "react-native";
import HealthBar from "../components/HealthBar";
import Satiety from "../components/Satiety";
import ItemsList from "../components/ItemsList";
import FeedButton from "../components/FeedButton";
import colors from "../constants/colors";
import useGameStore from "../stores/GameStore/useGameStore";
import {observer} from "mobx-react-lite";
import {GameStatus} from "../stores/GameStore/gameStore";

const GameScreen = observer(() => {
    const {satiety, processFeedTry, increaseSpeed, start, gameStatus} = useGameStore();
    const catAnimatedValue = useRef(new Animated.Value(0)).current;

    const animateCat = () => {
        Animated.timing(catAnimatedValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {catAnimatedValue.setValue(0)});
    }

    const handleFeed = () => {
        processFeedTry();
    }

    const handleStart = () => {
        start();
    }

    useEffect(() => {
        if (satiety !== 0) {
            if (satiety % 15 === 0) {
                animateCat();
                increaseSpeed();
            }
        }
    }, [satiety]);

    return (
        <View style={styles.container}>
            <ResultsModal/>
            <View style={styles.main}>
                <View style={styles.header}>
                    <HealthBar/>
                    <Satiety/>
                </View>
                <Animated.Image source={require('../assets/images/cat-food-hearts-icon1.png')} style={{
                    ...styles.cat,
                    ...{transform: [
                            {
                                translateY: catAnimatedValue.interpolate({
                                    inputRange: [0, 0.5, 1], outputRange: [0, -80, 0]
                                })},
                            {
                                translateX: catAnimatedValue.interpolate({
                                    inputRange: [0, 0.25, 0.75, 1],
                                    outputRange: [0, -20, 10, 0]
                                })},
                        ]}}}
                />
                <ItemsList/>
                <FeedButton text={gameStatus === GameStatus.IN_PROGRESS ? "FEED" : "START"}
                            onPress={gameStatus === GameStatus.IN_PROGRESS ? handleFeed : handleStart}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    cat: {
        width: 175,
        height: 175
    },
    container: {
        flex: 1,
        backgroundColor: colors.light,
        paddingTop: 10,
        paddingBottom: 35,
        paddingHorizontal: 25
    },
    header: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between"
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    }
})

export default GameScreen;
