import React from 'react';
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import {Button, Modal, StyleSheet} from "react-native";
import AppText from "./AppText";
import colors from "../constants/colors";

const ResultsModal = observer(() => {
    const {satiety, restart} = useGameStore();

    return (
        <Modal style={styles.modal} visible={true}>
            <AppText variation={"dark"}>You failed with result {satiety}</AppText>
            <Button title={"Restart"} onPress={restart}/>
        </Modal>
    );
});

const styles = StyleSheet.create({
   modal: {
       backgroundColor: colors.light,
       width: "80%",
       alignItems: "center",
       justifyContent: "center"
   },

});

export default ResultsModal;
