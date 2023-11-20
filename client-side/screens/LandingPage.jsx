import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, Platform, RefreshControl } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useMainStore } from "../stores/mainStore";
import MyCard from "../components/CardPage";
import MoodButton from "../components/MoodButton";
import { Audio } from "expo-av";
import { Button } from "react-native-paper";

export default function LandingPage({ navigation }) {
    const getQuote = useMainStore((state) => state.getQuote);
    const quote = useMainStore((state) => state.quote);

    useEffect(() => {
        getQuote();
    }, []);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getQuote().then(() => setRefreshing(false));
    }, []);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.contentContainer}>
                    {/* DATE */}
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>

                    {/* TOP TITLE */}
                    <Text style={Platform.OS === "ios" ? styles.iosText : styles.androidText}>Me Timer</Text>

                    {/* QUOTES HORIZONTAL */}
                    <FlatList
                        style={{ paddingTop: 10 }}
                        data={quote || []}
                        renderItem={({ item }) => <MyCard item={item} />}
                        horizontal={true}
                        contentContainerStyle={styles.flatListContainer}
                        pagingEnabled={true}
                    />

                    {/* MOOD TITLE */}
                    <Text style={Platform.OS === "ios" ? styles.iosText : styles.androidText}>How was your mood today</Text>

                    {/* MOOD EMOTE BUTTONS */}
                    <MoodButton toJournal={true} navigation={navigation} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 25,
        width: "100%",
        marginLeft: 7
    },
    contentContainer: {
        marginHorizontal: 16
    },
    flatListContainer: {
        paddingRight: 16
    },
    iosText: {
        paddingTop: 15,
        paddingLeft: 13,
        fontFamily: "Helvetica",
        fontSize: 22,
        fontWeight: "500"
    },
    androidText: {
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "400"
    },
    dateContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    dateText: {
        fontSize: 16
    }
});
