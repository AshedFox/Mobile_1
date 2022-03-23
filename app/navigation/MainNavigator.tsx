import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "../screens/MainScreen";
import AboutScreen from "../screens/AboutScreen";
import Header from "../components/Header";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {StyleSheet} from "react-native";
import colors from "../constants/colors";
import IonIcon from "react-native-vector-icons/Ionicons";
import HelpScreen from "../screens/HelpScreen";
import ResultsScreen from "../screens/ResultsScreen";
import GameScreen from "../screens/GameScreen";


const Drawer = createDrawerNavigator<MainDrawerProps>()

export type MainDrawerProps = {
    Game: {},
    Results: {},
    Help: {},
    About: {},
}

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                drawerLabelStyle: styles.label,
                drawerActiveTintColor: colors.primary
            }}>
                <Drawer.Screen name={"Game"} component={GameScreen} options={{
                    headerTitle: "FeedTheCat", drawerLabel: "Game",
                    header: props => <Header {...props} showShare={true}/>,
                    drawerIcon: props => <IonIcon name={"home-outline"} color={props.color} size={props.size}/>
                }}/>
                <Drawer.Screen name={"Results"} component={ResultsScreen} options={{
                    headerTitle: "Results", drawerLabel: "Results",
                    header: props => <Header {...props} showShare={false}/>,
                    drawerIcon: props => <IonIcon name={"stats-chart-outline"} color={props.color} size={props.size}/>
                }}/>
                <Drawer.Screen name={"Help"} component={HelpScreen} options={{
                    headerTitle: "Guide", drawerLabel: "Guide",
                    header: props => <Header {...props} showShare={false}/>,
                    drawerIcon: props => <IonIcon name={"help-circle-outline"} color={props.color} size={props.size}/>
                }}/>
                <Drawer.Screen name={"About"} component={AboutScreen} options={{
                    headerTitle: "Лабораторная работа №1", drawerLabel: "About",
                    header: props => <Header {...props} showShare={false}/>,
                    drawerIcon: props => <IonIcon name={"information-circle-outline"} color={props.color} size={props.size}/>
                }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: 'sans-serif-medium',
    }
})

export default MainNavigator;
