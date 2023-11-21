import React, { memo } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, View } from "react-native";

function MoodButton({ toJournal, navigation }) {
  const moodsRating = useMainStore((state) => state.moodsRating);
  const selectedMood = useMainStore((state) => state.selectedMood);
  const toggleMoodsRating = useMainStore((state) => state.toggleMoodsRating);
  const seletedMood = useMainStore((state) => state.selectedMood);
  return (
    <View style={styles.iconContainer}>
      {moodsRating.map((el, index) => {
        return (
          <Button
            key={index + "journal"}
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name={moodsRating[index].emote}
                size={50}
                color={
                  moodsRating[index].rating == seletedMood.rating
                    ? selectedMood.colorWhenPressed
                    : moodsRating[index].color
                }
                onPress={() => {
                  toggleMoodsRating(index);
                  if (toJournal) {
                    navigation.navigate("JournalPage");
                  }
                }}
              />
            )}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    marginLeft: 7,
    // marginBottom: 20,
  },
});

export default memo(MoodButton);