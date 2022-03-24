import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {get, ref, onValue} from "firebase/database";
import {database} from "../firebase/firebaseConfig";
import useAccountStore from "../stores/AccountStore/useAccountStore";
import AppText from "../components/AppText";
import colors from "../constants/colors";
import App from "../../App";

const ResultsScreen = () => {
    const {user} = useAccountStore();
    const [results, setResults] = useState<{satiety: number, time: number}[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onValue(ref(database, `results/${user!.uid}`), snapshot => {
            setLoading(false);
            if (snapshot.exists()) {
                setResults(snapshot.val());
            } else {
                setResults([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {loading ?
                <AppText variation={"dark"}>Loading...</AppText> :
                results.map((result, index) => (
                    <View key={index} style={styles.result}>
                        <AppText variation={"dark"}>Satiety: {result.satiety}</AppText>
                        <AppText variation={"dark"}>Date: {new Date(result.time).toLocaleString()}</AppText>
                    </View>
                ))
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    result: {
        padding: 10,
        backgroundColor: `${colors.primary}1c`,
        borderRadius: 4,
        margin: 2
    }
})

export default ResultsScreen;
