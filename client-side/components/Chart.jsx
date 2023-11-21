import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Text } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";

export default function Chart() {
  const recordChart = useMainStore((state) => state.recordChart);
  return (
    <>
      {recordChart.length != 0 && (
        <View>
          <Text>Mood Chart</Text>
          <BarChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  data: recordChart,
                },
              ],
            }}
            width={Dimensions.get("window").width - 32} // from react-native
            height={250}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 10,
            }}
          />
        </View>
      )}
    </>
  );
}
