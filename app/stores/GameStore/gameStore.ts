import {makeAutoObservable} from "mobx";
import itemsGenerator from "../../helpers/itemsGenerator";
import FoodItem from "../../types/FoodItem";


class GameStore {
    constructor() {
        makeAutoObservable(this);
    }

    readonly missclickEffect: number = 0.5;
    readonly maxHealth: number = 3.0;
    readonly maxSpeed: number = 3.0;
    readonly maxItems: number = 3.0;
    currentSpeed: number = 1;
    items: FoodItem[] = [];
    health: number = this.maxHealth;
    satiety: number = 0;
    checkField?: {x: number, width: number};
    isLose: boolean = false;

    setCheckField = (x: number, width: number) => {
        this.checkField = {x, width}
    }
    restart = () => {
        while (this.items.length) {
            this.items.pop();
        }
        this.currentSpeed = 1;
        this.health = this.maxHealth;
        this.satiety = 0;
        this.isLose = false;
    }
    affect = (satietyEffect: number, healthEffect: number) => {
        if (!this.isLose) {
            this.affectSatiety(satietyEffect);
            this.affectHealth(healthEffect);
        }
    }
    affectHealth = (effect: number) => {
        if (!this.isLose) {
            const newValue = this.health + effect;
            this.health = Math.min(Math.max(newValue, 0), this.maxHealth);
        }

        if (this.health === 0) {
            this.isLose = true;
        }
    }
    affectSatiety = (effect: number) => {
        if (!this.isLose) {
            this.satiety += effect;
        }
    }
    increaseSpeed = () => {
        if (this.currentSpeed < this.maxSpeed) {
            this.currentSpeed += 0.1;
        }
    }
    generateNewItem = () => {
        if (!this.isLose) {
            this.items = [...this.items, itemsGenerator.generateItem()!];
        }
    }
    removeItem = (id: string) => {
        this.items = this.items.filter((item) => item.id !== id);
    }
    changeCoords = (id: string, x: number, width: number) => {
        this.items = this.items.map(item => {
            if (item.id === id) {
                item.x = x;
                item.width = width;
            }
            return item;
        })
    }
    findNearest = () => {
        let foundItem: FoodItem | null;
        let foundRange = Number.MAX_SAFE_INTEGER;

        if (this.checkField !== undefined) {
            for (const item of this.items) {
                if (item && item.x && item.width) {
                    const range = Math.abs((this.checkField.x + this.checkField.width / 2) - (item.x + item.width / 2));

                    if (range <= this.checkField.width && range <= foundRange) {
                        foundItem = item;
                        foundRange = range;
                    }
                }
            }
        }

        // @ts-ignore
        return foundItem;
    }
    isIntersected = (item: FoodItem) => {
        if (item.x !== undefined && item.width !== undefined  && this.checkField !== undefined) {
            return Math.abs((this.checkField.x + this.checkField.width / 2) - (item.x + item.width / 2)) <= this.checkField.width / 2;
        }
        return false;
    }
    processFeedTry = () => {
        if (!this.isLose) {
            const item = this.findNearest();

            if (item) {
                if (this.isIntersected(item)) {
                    this.affect(item.foodItem.satietyEffect, item.foodItem.healthEffect);
                    this.removeItem(item.id);
                } else {
                    this.affectHealth(-this.missclickEffect);
                }
            }
        }
    }
    itemExists = (item: FoodItem) => {
        return this.items.includes(item);
    }
    processFinish = (item: FoodItem) => {
        if (this.itemExists(item)) {
            if (!this.isLose) {
                this.affectHealth(-item.foodItem.fallDamage);
            }
            this.removeItem(item.id);
        }
    }
}

export default new GameStore();
