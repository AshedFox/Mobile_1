import React, {FC, useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from "react-native";
import FA5Icon from "react-native-vector-icons/FontAwesome5";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {FoodItemsDataKeys} from "../types/FoodItemData";
import {observer} from "mobx-react-lite";
import useGameStore from "../stores/GameStore/useGameStore";
import FoodItem from "../types/FoodItem";


type Props = {
    item: FoodItem,
    startX: number,
    endX: number
}


const Item: FC<Props> = observer(({item, startX, endX}) => {
    const {currentSpeed, changeCoords, processFinish} = useGameStore();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const itemRef = useRef<View>(null);

    useEffect(() => {
        Animated.timing(animatedValue, {
            easing: Easing.linear,
            duration: 2000 / currentSpeed,
            toValue: 1,
            useNativeDriver: true,
        }).start(_ =>
            processFinish(item))
    }, [])

    const renderIcon = () => {
        switch (item.foodItem.type) {
            case "poison": {
                return (
                    <MCIIcon size={50} color={"#24bd3b"} name={"bottle-tonic-skull-outline"}/>
                );
            }
            case "potion": {
                return (
                    <MCIIcon size={50} color={"#a41717"} name={"bottle-tonic-plus-outline"}/>
                );
            }
            case "fish": {
                return (
                    <FA5Icon size={50} color={"#6097a6"} name={"fish"}/>
                );
            }
        }
    }

    useEffect(() => {
        setInterval(() => {
            if (itemRef && itemRef.current) {
                itemRef.current.measure((x, y,width,height,pageX) => {
                    changeCoords(item.id, pageX, width);
                })
            }
        }, 50);
    }, [animatedValue])

    return (
        <View style={styles.container}>
            <Animated.View ref={itemRef} style={{
                transform: [
                    {translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [startX, endX],
                    })},
                    {translateY: animatedValue.interpolate({
                        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        outputRange: [-10, 0, 10, 0, -10, 0, 10, 0, -10, 0, 10]
                    })}
                ]
            }}>
                {renderIcon()}
            </Animated.View>
        </View>
    );
});

const styles = StyleSheet.create({
   container: {
       position: "absolute"
   }
});

export default Item;
