import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, TextInput, ScrollView, View, Alert } from "react-native";
import * as Calendar from "expo-calendar";

async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
}

async function createCalendar(playdate, teamname, location, diaryEntry) {
    console.log(playdate, teamname, location, diaryEntry, "<<<<<<<");

    const defaultCalendarSource =
        Platform.OS === "ios"
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: "CalendarName" };
    const newCalendarID = await Calendar.createCalendarAsync({
        title: "CalendarName",
        color: "red",
        timeZone: "GMT+1",
        status: Calendar.EventStatus.CONFIRMED,
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "internalCalendarName",
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    console.log(`Your new calendar ID is: ${newCalendarID}`);
    Alert.alert(`Your text in your diary.`);

    await Calendar.createEventAsync(newCalendarID, {
        title: "Todo or Reminder Title",
        startDate: new Date(playdate), 
        endDate: new Date(playdate), 
        timeZone: "GMT+1",
        location: location, 
        alarms: [{ relativeOffset: -15 }],
        status: Calendar.EventStatus.CONFIRMED,
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
}

export default function CalendarPage() {
    const [diaryEntry, setDiaryEntry] = useState("");
    const [diaryEntries, setDiaryEntries] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === "granted") {
                console.log("calendar access granted");
            }
        });
    }, []);

    const saveDiaryEntry = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
        
        setDiaryEntries([
            ...diaryEntries,
            { date: formattedDate, entry: diaryEntry },
        ]);

        // createCalendar(currentDate, "Team Name", "Indonesia", diaryEntry);
        Alert.alert(`mantap mas`);
        setDiaryEntry("");
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="What's happening today?"
                multiline
                value={diaryEntry}
                onChangeText={(text) => setDiaryEntry(text)}
            />
            <TouchableWithoutFeedback onPress={saveDiaryEntry}>
                <Text style={styles.button}>Save to Diary</Text>
            </TouchableWithoutFeedback>
            {diaryEntries.map((entry) => (
                <View key={entry.date} style={styles.diaryEntry}>
                    <Text>{entry.date}</Text>
                    <Text>{entry.entry}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: "blue",
        color: "white",
        padding: 10,
        textAlign: "center",
        marginBottom: 10,
    },
    diaryEntry: {
        marginBottom: 10,
    },
});
