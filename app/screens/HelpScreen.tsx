import React, {FC, useState} from 'react';
import {Button, Pressable, StyleSheet, View} from "react-native";
import AppText from "../components/AppText";
import colors from "../constants/colors";
import {MainDrawerProps} from "../navigation/MainDrawerNavigator";
import {DrawerScreenProps} from "@react-navigation/drawer";
import guide from "../constants/guide";


const HelpScreen: FC<DrawerScreenProps<MainDrawerProps, "Help">> = ({navigation}) => {
    const [current, setCurrent] = useState(0);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <AppText variation={"dark"} style={styles.text}>{guide[current].text}</AppText>
                <View style={styles.buttons}>
                    <Button title={"Prev"} onPress={() => setCurrent(prev => prev - 1)}
                            disabled={current == 0}
                    />
                    <Button title={current == guide.length - 1 ? "Start" : "Next"} onPress={() => {
                        if (current == guide.length - 1) {
                            setCurrent(0);
                            // @ts-ignore
                            navigation.navigate("Game");
                        } else {
                            setCurrent(prev => prev + 1)
                        }
                    }}/>
                </View>
            </View>
            <View style={styles.radioButtons}>
                {guide.map((_, index) =>
                    <Pressable key={index} style={styles.radio}
                               onPress={() => {
                                   if (index !== current) {
                                       setCurrent(index)
                                   }
                               }}
                    >
                        {index === current && <View style={styles.radioFilling}/>}
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40
    },
    content: {
        flex: 1
    },
    text: {
        fontSize: 15,
        flex: 1
    },
    buttons: {
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    radioButtons: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    radio: {
        borderRadius: 10,
        width: 20,
        height: 20,
        borderStyle: "solid",
        borderColor: colors.dark,
        borderWidth: 2,
        backgroundColor: "transparent",
        marginHorizontal: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    radioFilling: {
        backgroundColor: colors.dark,
        borderRadius: 6,
        width: 12,
        height: 12
    },
})

export default HelpScreen;
