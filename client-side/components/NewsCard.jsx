import { StyleSheet, View, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewsCard({ news }) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Cover
        source={{
          uri: news.image,
        }}
        style={{ margin: 15 }}
      />
      <Card.Content style={{ marginHorizontal: 5 }}>
        <Text style={{ marginBottom: 10, fontWeight: 'bold' }} variant="titleMedium">
          {news.title}
        </Text>
        <Text numberOfLines={3} variant="bodyMedium">
          {news.content}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => Linking.openURL(news.link)}>Read More..</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  newsTopText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
});
