import foodItems from "../constants/foodItems";
import FoodItemData from "../types/FoodItemData";
import FoodItem from "../types/FoodItem";
import {v4} from "react-native-uuid/dist/v4";

const generateItem = () => {
    const item: FoodItem = {
        id: v4() as string,
        foodItem: generateItemData()!,
    }
    return item;
}

const generateItemData = () => {
    let [chance, item]: [number, FoodItemData?] = [0, undefined];

    for (const curItem of foodItems) {
        const curChance = Math.random() * curItem.chanceCoef;

        if (curChance > chance) {
            item = curItem;
            chance = curChance;
        }
    }

    return item;
}

export default {
    generateItemData,
    generateItem
}
