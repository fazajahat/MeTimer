import { SafeAreaView } from "react-native-safe-area-context";
import CardHistory from "../components/CardHistory";

export default function HistoryPage() {
  const records = useMainStore((state) => state.records);

  console.log(records, "ini records historypage");
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* CARD HISTORY */}
        {/* {records?.map((el, index) => (
          <CardHistory key={index + "cardpage"} data={el} />
        ))} */}
      </SafeAreaView>
    </>
  );
}
