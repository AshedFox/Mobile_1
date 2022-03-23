import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import Item from "./Item";
import FoodItemData from "../types/FoodItemData";
import itemsGenerator from "../helpers/itemsGenerator";
import colors from "../constants/colors";
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import FoodItem from "../types/FoodItem";


const ItemsList = observer(() => {
    const {items, isLose, setCheckField, generateNewItem, currentSpeed, maxItems} = useGameStore();
    const circleRef = useRef<View>(null)
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

    useEffect(() => {
        if (!isLose) {
            if (intervalId) {
                clearInterval(intervalId);

                setIntervalId(setInterval(() => {
                    generateNewItem();
                }, 2200 / maxItems / currentSpeed));
            } else {
                setTimeout(() => {
                    setIntervalId(setInterval(() => {
                        generateNewItem();
                    }, 2200 / maxItems / currentSpeed));
                }, 3000);
            }

            return () => {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            }
        }
    }, [isLose]);

    return (
        <View style={styles.container}>
            <View style={styles.circle} ref={circleRef} onLayout={(e) => {
                if (circleRef && circleRef.current) {
                    circleRef.current.measure((x,y, width, height, pageX) => {
                        setCheckField(pageX, width);
                    });
                }
            }}/>
            {items.map((item, i) =>
                <Item key={item.id} item={item} startX={-150} endX={150}/>
            )}
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
