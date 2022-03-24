import {makeAutoObservable} from "mobx";
import itemsGenerator from "../../helpers/itemsGenerator";
import FoodItem from "../../types/FoodItem";
import {database} from "../../firebase/firebaseConfig";
import {ref, set, get} from "firebase/database";
import accountStore from "../AccountStore/accountStore";

export enum GameStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    LOST = "LOST"
}

class GameStore {
    constructor() {
        makeAutoObservable(this);
    }

    readonly missclickEffect: number = 0.5;
    readonly maxHealth: number = 3;
    readonly maxSpeed: number = 3;
    readonly maxItems: number = 3;
    currentSpeed: number = 1;
    items: FoodItem[] = [];
    health: number = this.maxHealth;
    satiety: number = 0;
    checkField?: {x: number, width: number};
    gameStatus: GameStatus = GameStatus.NOT_STARTED;

    setCheckField = (x: number, width: number) => {
        this.checkField = {x, width}
    }
    stop = () => {
        if (this.gameStatus === GameStatus.IN_PROGRESS) {
            while (this.items.length) {
                this.items.pop();
            }
            this.currentSpeed = 1;
            this.health = this.maxHealth;
            this.satiety = 0;
            this.gameStatus = GameStatus.NOT_STARTED;
        }
    }
    start = () => {
        if (this.gameStatus !== GameStatus.IN_PROGRESS) {
            while (this.items.length) {
                this.items.pop();
            }
            this.currentSpeed = 1;
            this.health = this.maxHealth;
            this.satiety = 0;
            this.gameStatus = GameStatus.IN_PROGRESS;
        }
    }
    processLose = async (userId?: string) => {
        this.gameStatus = GameStatus.LOST;

        if (userId) {
            const resultsRef = ref(database, `results/${userId}/`);

            const dataSnapshot = await get(resultsRef);
            let data = [{
                satiety: this.satiety,
                time: Date.now()
            }];
            if (dataSnapshot.exists()) {
                data = [...data, ...dataSnapshot.val()];
            }
            await set(resultsRef, data);
        }
    }
    affect = (satietyEffect: number, healthEffect: number) => {
        if (this.gameStatus === GameStatus.IN_PROGRESS) {
            this.affectSatiety(satietyEffect);
            this.affectHealth(healthEffect);
        }
    }
    affectHealth = (effect: number) => {
        if (this.gameStatus === GameStatus.IN_PROGRESS) {
            const newValue = this.health + effect;
            this.health = Math.min(Math.max(newValue, 0), this.maxHealth);
        }

        if (this.health === 0) {
            this.processLose(accountStore.user?.uid);
        }
    }
    affectSatiety = (effect: number) => {
        if (this.gameStatus === GameStatus.IN_PROGRESS) {
            this.satiety += effect;
        }
    }
    increaseSpeed = () => {
        if (this.currentSpeed < this.maxSpeed) {
            this.currentSpeed += 0.1;
        }
    }
    generateNewItem = () => {
        if (this.gameStatus === GameStatus.IN_PROGRESS) {
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
        if (this.gameStatus === GameStatus.IN_PROGRESS) {
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
            if (this.gameStatus === GameStatus.IN_PROGRESS) {
                this.affectHealth(-item.foodItem.fallDamage);
            }
            this.removeItem(item.id);
        }
    }
}

export default new GameStore();
