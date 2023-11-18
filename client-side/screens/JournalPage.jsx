import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Chip,
} from "react-native-paper";
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
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryEntry, setDiaryEntry] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);

  // Using object because more faster when clicked than array
  const chipData = {
    0: "Depressed",
    1: "Happy",
    2: "Excited",
    3: "Sad",
    4: "Angry",
    5: "Anxious",
    6: "Confused",
    7: "Disappointed",
    8: "Scared",
    9: "Surprised",
    10: "Calm",
    11: "Bored",
    12: "Nervous",
    13: "Relieved",
    14: "Stressed",
  };
  const [selectedStates, setSelectedStates] = useState(
    Object.fromEntries(Object.entries(chipData).map(([key]) => [key, false]))
  );

  const journalContent = useRef();

  useEffect(() => {
    async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        console.log("calendar access granted");
      }
    };
  }, []);

  const saveDiaryEntry = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

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

      {/* MOOD CHIPS */}
      <View style={styles.chipWrapper}>
        {Object.values(chipData).map((chip, index) => (
          <Chip
            key={index}
            selected={selectedStates[index]}
            showSelectedOverlay
            style={styles.chip}
            onPress={() => {
              setSelectedStates({
                ...selectedStates,
                [index]: !selectedStates[index],
              });
            }}
          >
            {chip}
          </Chip>
        ))}
      </View>

      {/* JOURNAL TITLE */}
      <TextInput
        style={[styles.input]}
        placeholder="The day I met my best friend"
        returnKeyType="next"
        value={diaryTitle}
        onChangeText={(text) => setDiaryTitle(text)}
        onSubmitEditing={() => journalContent.current.focus()}
        blurOnSubmit={false}
        label="Title"
      />

      {/* JOURNAL CONTENT */}
      <TextInput
        ref={journalContent}
        style={[styles.input]}
        multiline
        numberOfLines={6}
        placeholder="What's happening today?"
        returnKeyType="emter"
        value={diaryEntry}
        onChangeText={(text) => setDiaryEntry(text)}
        label="Journal Entry"
      />

      <Button mode="contained" onPress={() => console.log("Pressed")}>
        Save to Diary
      </Button>

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
    minHeight: Platform.OS === "ios" ? 150 : 0,
    maxHeight: Platform.OS === "ios" ? 150 : null,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
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
  chipWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  chip: {
    minWidth: 10,
    alignSelf: "flex-start",
  },
});
