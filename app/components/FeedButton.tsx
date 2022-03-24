import React, {FC} from 'react';
import AppText from "./AppText";
import {Pressable, StyleSheet} from "react-native";
import colors from "../constants/colors";
import useGameStore from "../stores/GameStore/useGameStore";

type Props = {
    text: string,
    onPress: () => void
}

const FeedButton: FC<Props> = ({onPress, text}) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <AppText style={styles.text} variation={"light"}>{text}</AppText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 3,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    text: {
        fontSize: 18
    },
})

export default FeedButton;
