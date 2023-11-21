import { SafeAreaView } from "react-native-safe-area-context";
import CardHistory from "../components/CardHistory";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, Text, View } from "react-native";

export default function HistoryPage() {
  const records = useMainStore((state) => state.records);

  console.log(records, "ini records historypage");
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Journals</Text>
        {/* CARD HISTORY */}
        {/* {records?.map((el, index) => (
          <CardHistory key={index + "cardpage"} data={el} />
        ))} */}
      </SafeAreaView>
    </>
  );
}
