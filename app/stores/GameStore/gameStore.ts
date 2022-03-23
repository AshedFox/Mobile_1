import {makeAutoObservable} from "mobx";
import itemsGenerator from "../../helpers/itemsGenerator";
import FoodItem from "../../types/FoodItem";
import foodItem from "../../types/FoodItem";


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
    health: number = 3;
    satiety: number = 0;
    checkField?: {x: number, width: number};
    isLose: boolean = false;

    setCheckField = (x: number, width: number) => {
        this.checkField = {x, width}
    }
    restart = () => {
        this.items = [];
        this.currentSpeed = 1;
        this.health = this.maxHealth;
        this.satiety = 0;
        //this.checkField = undefined;
        this.isLose = false;
    }
    affect = (satietyEffect: number, healthEffect: number) => {
        this.affectSatiety(satietyEffect);
        this.affectHealth(healthEffect);
    }
    affectHealth = (effect: number) => {
        if (!this.isLose) {
            this.health = Math.max(0, Math.min(this.health + effect, this.maxHealth));
        }

        if (this.health === 0) {
            this.isLose = true;
        }
    }
    affectSatiety = (effect: number) => {
        this.satiety += effect;
    }
    increaseSpeed = () => {
        if (this.currentSpeed < this.maxSpeed) {
            this.currentSpeed += 0.1;
        }
    }
    generateNewItem = () => {
        this.items = [...this.items, itemsGenerator.generateItem()!];
    }
    replaceItem = (id: string) => {
        this.items = [...this.items.filter((item) => item.id !== id), itemsGenerator.generateItem()!];
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
    processFinish = (item: FoodItem) => {
        this.affectHealth(-item.foodItem.fallDamage)
        this.removeItem(item.id)
    }
}

export default new GameStore();
