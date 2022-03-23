import {createContext, useContext} from "react";
import gameStore from "./gameStore";

const context = createContext(gameStore);

export default () => useContext(context);
