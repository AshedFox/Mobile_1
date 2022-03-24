import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import {Button, Modal, Pressable, Share, StyleSheet, View} from "react-native";
import AppText from "./AppText";
import colors from "../constants/colors";
import IonIcon from "react-native-vector-icons/Ionicons";
import {GameStatus} from "../stores/GameStore/gameStore";

const ResultsModal = observer(() => {
    const {satiety, gameStatus} = useGameStore();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(gameStatus === GameStatus.LOST);
    }, [gameStatus])

    const handleShare = async () => {
        await Share.share({
            message: `I achieved ${satiety} satiety! Can you get more?!`
        });
    }

    const handleClick = () => {
        setIsVisible(false);
    }

    return (
        <Modal style={styles.modal} animationType={"slide"} visible={isVisible} transparent={true}>
            <View style={styles.modalView}>
                <View style={styles.modalContent}>
                    <AppText style={styles.modalTitle} variation={"dark"}>You failed with result
                        <AppText style={styles.resultValue} variation={"dark"}> {satiety}</AppText>
                    </AppText>
                    <View style={styles.buttons}>
                        <Button title={"OK"} onPress={handleClick}/>
                        <Pressable onPress={handleShare} style={styles.share}>
                            <IonIcon name={"share-social"} size={35} color={colors.dark}/>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modal: {
      alignItems: "center",
      justifyContent: "center",
    },
    modalView: {
       flex: 1,
       alignItems: "center",
       justifyContent: "center"
    },
    modalContent: {
        backgroundColor: colors.light,
        paddingVertical: 15,
        paddingHorizontal: 20,
        maxWidth: "80%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 4,
    },
    modalTitle:  {
        marginBottom: 20,
        fontSize: 20,
        borderBottomColor: colors.dark,
        borderBottomWidth: 2,
        borderStyle: "solid"
    },
    resultValue: {
        fontStyle: "italic",
        color: colors.secondary
    },
    buttons: {
        flexDirection: "row"
    },
    share: {
        marginLeft: "auto"
    }
});

export default ResultsModal;
