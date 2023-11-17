import React from "react";
import { View, Text, ScrollView, FlatList, Platform } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, Button } from "react-native-paper";
import MyCard from "./CardPage";
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Searchbar placeholder="Search" />
          <Text
            style={Platform.OS === "ios" ? styles.iosText : styles.androidText}
          >
            Me Timer
          </Text>
          <FlatList
            style={{ paddingTop: 10 }}
            data={[{ key: "a" }, { key: "b" }]}
            renderItem={({ item }) => <MyCard />}
            horizontal={true}
            contentContainerStyle={styles.flatListContainer}
            pagingEnabled={true}
          />
          <Text
            style={Platform.OS === "ios" ? styles.iosText : styles.androidText}
          >
            How was your mood today
          </Text>
          <View style={styles.iconContainer}>

          <Button
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="emoticon-cry-outline"
                size={50}
                color={color}
                style={styles.icons}
              />
            )}
          >
          </Button>
          <Button
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="emoticon-cool-outline"
                size={50}
                color={color}
                style={styles.icons}
              />
            )}
          >
          </Button>
          <Button
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="emoticon-sick-outline"
                size={50}
                color={color}
                style={styles.icons}
              />
            )}
          >
          </Button>
          <Button
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="emoticon-excited-outline"
                size={50}
                color={color}
                style={styles.icons}
              />
            )}
          >
          </Button>
          <Button
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="emoticon-kiss-outline"
                size={50}
                color={color}
                style={styles.icons}
              />
            )}
          >
          </Button>
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
});
