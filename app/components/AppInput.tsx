import React, {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from "react-native";
import colors from "../constants/colors";

type Props = {
    variant: "dark" | "light";
}

const AppInput: FC<TextInputProps&Props> = ({style, placeholder,
                                                variant, value, onChangeText,
                                                secureTextEntry}) =>
{
    return (
        <TextInput style={{...styles.default, ...(variant === "dark" ? styles.dark : styles.light), ...style as object}}
                   value={value} placeholder={placeholder} onChangeText={onChangeText} secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    default: {
        fontFamily: 'sans-serif-medium',
        padding: 10,
        borderRadius: 10
    },
    dark: {
        color: colors.dark
    },
    light: {
        color: colors.light
    }
})

export default AppInput;
