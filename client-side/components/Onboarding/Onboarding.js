import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";

import OnboardingItem from "./OnboardingItem";
import Pagination from "./Pagination";
import slides from "./slides";
import { Button } from "react-native-paper";

export default Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endPage, setEndPage] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);

    // IF IT REACHED THE END OF THE SLIDES
    if (viewableItems[0].index === slides.length - 1) {
      console.log("Reached the end of the slides");
      setEndPage(true);
    } else {
      setEndPage(false);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, borderWidth: 1 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <View style={styles.pagination}>
          <Pagination data={slides} scrollX={scrollX} />
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("SignupPage")}
          style={styles.button}
          labelStyle={styles.text}
          disabled={!endPage}
        >
          Get Started
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 2,
    marginTop: 30,
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
