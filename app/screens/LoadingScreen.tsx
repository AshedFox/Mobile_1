import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from "react-native";

const LoadingScreen = () => {
    const imageAnimatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(Animated.timing(imageAnimatedValue, {
            toValue: 1,
            duration: 700,
            easing: Easing.linear,
            useNativeDriver: true
        })).start();
    }, [])

    return (
        <View style={styles.container}>
            <Animated.Image source={require('../assets/images/cat-food-hearts-icon1.png')} style={{
                ...styles.image,
                ...{transform: [
                    {rotateZ: imageAnimatedValue.interpolate({inputRange: [0, 1], outputRange: ["0deg", "360deg"]})},
                ]}
            }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 120,
        height: 120
    }
})

export default LoadingScreen;
