import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import JournalPage from "./JournalPage";
import MyCard from "../components/CardPage";
import MoodButton from "../components/MoodButton";

export default function LandingPage({ navigation }) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const [moodsRating, setMoodsRating] = useState([
    {
      emote: "emoticon-cry-outline",
      rating: 1,
      color: "red",
      pressed: false,
      colorWhenPressed: "pink",
      topText: 'What\'s making your day terrible?'
    },
    {
      emote: "emoticon-cool-outline",
      rating: 2,
      color: "orange",
      pressed: false,
      colorWhenPressed: "pink",
      topText: 'Why are you feeling down?'
    },
    {
      emote: "emoticon-sick-outline",
      rating: 3,
      color: "yellow",
      pressed: false,
      colorWhenPressed: "pink",
      topText: 'Is your day flat today?'
    },
    {
      emote: "emoticon-excited-outline",
      rating: 4,
      color: "blue",
      pressed: false,
      colorWhenPressed: "pink",
      topText: 'Having a good day?'
    },
    {
      emote: "emoticon-kiss-outline",
      rating: 5,
      color: "green",
      pressed: false,
      colorWhenPressed: "pink",
      topText: 'What\'s making your day awesome?'
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>

          {/* DATE */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>

          {/* TOP TITLE */}
          <Text
            style={Platform.OS === "ios" ? styles.iosText : styles.androidText}
          >
            Me Timer
          </Text>

          {/* QUOTES HORIZONTAL */}
          <FlatList
            style={{ paddingTop: 10 }}
            data={[{ key: "a" }, { key: "b" }]}
            renderItem={({ item }) => <MyCard />}
            horizontal={true}
            contentContainerStyle={styles.flatListContainer}
            pagingEnabled={true}
          />

          {/* MOOD TITLE */}
          <Text
            style={Platform.OS === "ios" ? styles.iosText : styles.androidText}
          >
            How was your mood today
          </Text>

          {/* MOOD EMOTE BUTTONS */}
          <View style={styles.iconContainer}>
            {moodsRating.map((el, index) => {
              return (
                <MoodButton
                  key={index + "journal"}
                  navigation={navigation}
                  moodsRating={moodsRating}
                  index={index}
                  setMoodsRating={setMoodsRating}
                  navigate={true}
                />
              );
            })}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 25,
    width: "100%",
    marginLeft: 7,
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  flatListContainer: {
    paddingRight: 16,
  },
  iosText: {
    paddingTop: 15,
    paddingLeft: 13,
    fontFamily: "Helvetica",
    fontSize: 22,
    fontWeight: "500",
  },
  androidText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
});
