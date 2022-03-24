import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import MainScreen from "../screens/MainScreen";
import AboutScreen from "../screens/AboutScreen";
import Header from "../components/Header";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList, useDrawerProgress,
    useDrawerStatus
} from "@react-navigation/drawer";
import {StyleSheet} from "react-native";
import colors from "../constants/colors";
import IonIcon from "react-native-vector-icons/Ionicons";
import HelpScreen from "../screens/HelpScreen";
import ResultsScreen from "../screens/ResultsScreen";
import GameScreen from "../screens/GameScreen";
import MCIIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {observer} from "mobx-react-lite";
import {getAuth} from "firebase/auth";
import {StackProps} from "./StackNavigator";
import {auth} from "../firebase/firebaseConfig";
import useGameStore from "../stores/GameStore/useGameStore";


const Drawer = createDrawerNavigator<MainDrawerProps>()

export type MainDrawerProps = {
    Game: {},
    Results: {},
    Help: {},
    About: {},
}

const MainDrawerNavigator = observer(() => {
    const navigation = useNavigation();
    const {stop} = useGameStore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // @ts-ignore
                navigation.navigate("Auth");
            }
        })

        return () => unsubscribe();
    }, [])

    return (
            <Drawer.Navigator screenOptions={{
                drawerLabelStyle: styles.label,
                drawerActiveTintColor: colors.primary,
            }} initialRouteName={"Game"} drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props}/>
                        <DrawerItem icon={props => <MCIIcon name={"logout"} color={props.color} size={props.size}/>}
                                    labelStyle={styles.label}
                                    label="Logout" onPress={async () => {
                                        try {
                                            props.navigation.closeDrawer();
                                            stop();
                                            await getAuth().signOut();
                                        } catch (e) {
                                            alert(e.message);
                                        }
                                    }}
                        />
                    </DrawerContentScrollView>
                )
            }}>
                <Drawer.Screen name={"Game"} component={GameScreen} options={{
                    headerTitle: "FeedTheCat", drawerLabel: "Game",
                    header: props => <Header {...props} showShare={false}/>,
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
                    headerTitle: "Task №1", drawerLabel: "About",
                    header: props => <Header {...props} showShare={false}/>,
                    drawerIcon: props => <IonIcon name={"information-circle-outline"} color={props.color} size={props.size}/>
                }}/>
            </Drawer.Navigator>
    );
});

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "600",
        fontFamily: 'sans-serif-medium',
    }
})

export default MainDrawerNavigator;
