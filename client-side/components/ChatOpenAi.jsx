import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function ChatFromAi() {
  const [data, setData] = useState([]);
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [textInput, setTextInput] = useState("");

  const handlerInput = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: "user", text: textInput },
      { type: "bot", text: text },
    ]);
    setTextInput("");
  };
  return (
    <View style={styles.container}>
      <Text>Ai chat bot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: item.type === "user" ? "green" : "red",
              }}
            >
              {item.type === "user" ? "dapow" : "pacarku"}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        placeholder="ask me anything"
      />
      <TouchableOpacity style={styles.button} onPress={handlerInput}>
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
  },
  body: {
    backgroundColor: "#fffcc9",
    width: "102%",
    margin: 10,
  },
  bot: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "yellow",
    width: "90%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
});
