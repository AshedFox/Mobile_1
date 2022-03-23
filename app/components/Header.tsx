import React, {FC} from 'react';
import AppText from "./AppText";
import {Pressable, StyleSheet, View} from "react-native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import {DrawerHeaderProps} from "@react-navigation/drawer";

type Props = DrawerHeaderProps & {
    showShare: boolean
};

const Header: FC<Props> = ({navigation, route, options, showShare}) => {
    const handleShare = () => {

    }

    return (
        <View style={styles.header}>
            <Pressable onPress={() => {navigation.openDrawer()}}>
                <Icon name={"menu"} style={styles.icon}/>
            </Pressable>
            <AppText variation={"light"} style={styles.title}>{options.headerTitle}</AppText>
            {showShare &&
                <Pressable onPress={handleShare} style={styles.share}>
                    <Icon name={"share-social"} style={styles.icon}/>
                </Pressable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        marginHorizontal: 10
    },
    icon: {
        color: colors.light,
        fontSize: 32,
    },
    share: {
        marginLeft: "auto"
    }
})

export default Header;
