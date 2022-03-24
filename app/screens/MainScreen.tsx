import React from 'react';
import {observer} from "mobx-react-lite";
import MainDrawerNavigator from "../navigation/MainDrawerNavigator";

const MainScreen = observer(() => {
    return (
        <MainDrawerNavigator/>
    );
});


export default MainScreen;
