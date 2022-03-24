import React from 'react';
import MainScreen from "../screens/MainScreen";
import AuthScreen from "../screens/AuthScreen";
import useAccountStore from "../stores/AccountStore/useAccountStore";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator<StackProps>();

export type StackProps = {
    Main: {},
    Auth: {}
}

const StackNavigator = () => {
    const {user} = useAccountStore();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={user ? "Main" : "Auth"}>
            <Stack.Screen name={"Auth"} component={AuthScreen}/>
            <Stack.Screen name={"Main"} component={MainScreen}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
