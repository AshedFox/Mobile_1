import React, {useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import colors from '../constants/colors';
import {auth} from "../firebase/firebaseConfig";
import AppText from "../components/AppText";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import AppInput from "../components/AppInput";
import useAccountStore from "../stores/AccountStore/useAccountStore";
import IonIcon from "react-native-vector-icons/Ionicons";


const AuthScreen = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            alert(e.message)
        }
    }

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/cat-food-hearts-icon1.png')}/>
            <View style={styles.inputs}>
                <AppInput style={styles.input} variant={"dark"} value={email} placeholder={"Email"}
                          onChangeText={text => setEmail(text)}
                />
                <AppInput style={styles.input} variant={"dark"} value={password} placeholder={"Password"}
                          onChangeText={text => setPassword(text)} secureTextEntry
                />
            </View>
            <View style={styles.buttons}>
                <Pressable style={{...styles.button, ...styles.signUpButton}} onPress={handleSignUp}>
                    <AppText style={styles.buttonText} variation={"dark"}>SignUp</AppText>
                </Pressable>
                <Pressable style={{...styles.button, ...styles.loginButton}} onPress={handleLogin}>
                    <AppText style={styles.buttonText} variation={"light"}>Login</AppText>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        marginBottom: 40,
        alignSelf: "center",
        width: 192,
        height: 192
    },
    buttons: {
        flexDirection: "row",
        marginBottom: 20
    },
    button: {
        minWidth: 100,
        padding: 7,
        flexGrow: 1,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.secondary,
        borderStyle: "solid",
    },
    buttonIcon: {
        marginRight: 7
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
    },
    signUpButton: {
        backgroundColor: "transparent",
        marginRight: 20,
    },
    loginButton: {
        backgroundColor: colors.secondary,
    },
    inputs: {
        width: "100%",
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderRadius: 3,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.secondary,
    },
})

export default AuthScreen;
