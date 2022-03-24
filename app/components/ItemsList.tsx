import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from "react-native";
import Item from "./Item";
import colors from "../constants/colors";
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import {useNavigation} from "@react-navigation/native";
import {GameStatus} from "../stores/GameStore/gameStore";

const ItemsList = observer((props) => {
    const {items, gameStatus, currentSpeed, setCheckField, generateNewItem, maxItems} = useGameStore();
    const circleRef = useRef<View>(null);
    const [timer, setTimer] = useState<NodeJS.Timer>();
    const navigation = useNavigation()

    useEffect(() => {
        if (timer) {
            clearInterval(timer);
        }

        if (gameStatus === GameStatus.IN_PROGRESS) {
            setTimer(setInterval(() => {
                if (navigation.isFocused()) {
                    generateNewItem();
                }
            }, 2400 / maxItems / currentSpeed));
        }


        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [gameStatus, navigation.isFocused()]);

    return (
        <View style={styles.container}>
            <View style={styles.circle} ref={circleRef} onLayout={(e) => {
                if (circleRef && circleRef.current) {
                    circleRef.current.measure((x,y, width, height, pageX) => {
                        setCheckField(pageX, width);
                    });
                }
            }}/>
            {gameStatus === GameStatus.IN_PROGRESS &&
                items.map((item) => <Item key={item.id} item={item} startX={-150} endX={150}/>)
            }
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    circle: {
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: colors.dark,
        width: 76,
        height: 76,
        borderRadius: 38
    }
})

export default ItemsList;
