import React, { useState, memo } from "react";
import { Chip } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, View } from "react-native";

const MemoizedChip = memo(Chip);

export default function MoodChips() {
  const chipsData = useMainStore((state) => state.chipsData);
  const [selectedStates, setSelectedStates] = useState(
    Object.fromEntries(Object.entries(chipsData).map(([key]) => [key, false]))
  );

  return (
    <View style={styles.chipWrapper}>
      {Object.values(chipsData).map((chip, index) => (
        <MemoizedChip
          key={index + 'chip'}
          selected={selectedStates[index]}
          showSelectedOverlay
          style={styles.chip}
          onPress={() => {
            setSelectedStates({
              ...selectedStates,
              [index]: !selectedStates[index],
            });
            console.log(selectedStates);
          }}
        >
          {chip}
        </MemoizedChip>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chipWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    minWidth: 10,
    alignSelf: "flex-start",
  },
});