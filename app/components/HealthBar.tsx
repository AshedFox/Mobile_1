import React, {ReactNode} from 'react';
import {StyleSheet, View} from "react-native";
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import IonIcon from "react-native-vector-icons/Ionicons";
import {v4} from "react-native-uuid/dist/v4";

const HealthBar = observer(() => {
    const {health, maxHealth} = useGameStore();

    const renderContent = () => {
        const nodes: ReactNode[] = [];

        for (let i = 0; i < maxHealth; i++) {
            const diff = health - i;
            if (diff <= 0) {
                nodes.push(<IonIcon key={i} name={"heart-outline"} size={30} color={"red"}/>);
            } else if (diff <= 0.5) {
                nodes.push(<IonIcon key={i} name={"heart-half-outline"} size={30} color={"red"}/>);
            } else {
                nodes.push(<IonIcon key={i} name={"heart"} size={30} color={"red"}/>);
            }
        }

        return nodes;
    }

    return (
        <View style={styles.container}>
            {renderContent()}
        </View>
    );
});

const styles = StyleSheet.create({
   container: {
       flexDirection: "row"
   }
});

export default HealthBar;
