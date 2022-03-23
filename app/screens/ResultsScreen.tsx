import React from 'react';
import {ScrollView, View} from "react-native";
import AppText from "../components/AppText";

const ResultsScreen = () => {
    return (
        <View>
            <ScrollView>
                <AppText variation={"dark"}>1</AppText>
                <AppText variation={"dark"}>2</AppText>
                <AppText variation={"dark"}>3</AppText>
                <AppText variation={"dark"}>4</AppText>
                <AppText variation={"dark"}>5</AppText>
                <AppText variation={"dark"}>6</AppText>
                <AppText variation={"dark"}>7</AppText>
                <AppText variation={"dark"}>8</AppText>
            </ScrollView>
        </View>
    );
};

export default ResultsScreen;
