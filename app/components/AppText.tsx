import React, {FC} from 'react';
import { StyleSheet, Text, TextProps } from "react-native";
import colors from "../constants/colors";

type Props = {
    variation: "dark" | "light",
}

export const AppText: FC<TextProps&Props> = ({children, style, variation}) => {
    return (
        <Text style={{...styles.default, ...(variation === "dark" ? styles.dark : styles.light),  ...style as object}}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'sans-serif-medium',
    },
    dark: {
        color: colors.dark
    },
    light: {
        color: colors.light
    }
})

export default AppText;
