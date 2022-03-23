import FoodItemData from "../types/FoodItemData";

const foodItems: FoodItemData[] = [
    {
        type: "poison",
        healthEffect: -1,
        fallDamage: 0,
        chanceCoef: 0.3,
        satietyEffect: 0,
    },
    {
        type: "fish",
        healthEffect: 0.5,
        fallDamage: 0.5,
        chanceCoef: 1,
        satietyEffect: 1,
    },
    {
        type: "potion",
        healthEffect: 1,
        fallDamage: 0,
        chanceCoef: 0.1,
        satietyEffect: 1
    },
]

export default foodItems;
