export type FoodItemData = {
    healthEffect: number,
    fallDamage: number,
    satietyEffect: number,
    chanceCoef: number,
    type: FoodItemsDataKeys
}

export type FoodItemsDataKeys = "poison" | "potion" | "fish";

export default FoodItemData;
