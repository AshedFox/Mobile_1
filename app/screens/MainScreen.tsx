import React, {useEffect, useRef, useState} from 'react';
import {Alert, Animated, Easing, Modal, StyleSheet, View} from "react-native";
import colors from "../constants/colors";
import AppText from "../components/AppText";
import FeedButton from "../components/FeedButton";
import ItemsList from "../components/ItemsList";
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import Satiety from "../components/Satiety";
import HealthBar from "../components/HealthBar";
import ResultsModal from "../components/ResultsModal";
import useAccountStore from "../stores/AccountStore/useAccountStore";
import GameScreen from "./GameScreen";
import AuthScreen from "./AuthScreen";
import MainNavigator from "../navigation/MainNavigator";


const MainScreen = observer(() => {
    const {user} = useAccountStore();

    return (
        <View style={{flex: 1}}>
            {user ? <MainNavigator/> : <AuthScreen/>}
        </View>
    );
});


export default MainScreen;
