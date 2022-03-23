import {createContext, useContext} from "react";
import accountStore from "./accountStore";

const context = createContext(accountStore);

export default () => useContext(context);
