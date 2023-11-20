import { View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewsPage() {
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
        }}
      >
        <Text style={{alignSelf: 'center'}}>News Page</Text>
      </View>
    </SafeAreaView>
  );
}
