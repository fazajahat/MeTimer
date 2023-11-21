import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import ChatAi from "./ChatAi";
import ChatUser from "./ChatUser";

export default function ChatFromAi() {
  const chatLog = [{question: "How do you do?", answer: "You like me and i like you"}, {question: "Bagaimana bisa ku lupakan?", answer: "anda bisa melupakan dengan cinta"}]
  const [data, setData] = useState([]);
  const apiKey = "";
  const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions";
  const [textInput, setTextInput] = useState("");

  const handleInput = async () => {
    try {
      console.log('masuk')
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>Conseling With AI</Text>
            <ScrollView style={{height: "78%", backgroundColor: "pink", width: "100%"}}>
              <View style={{ flexDirection: 'column', padding: 10}}>
                {chatLog.map((el, index) => {
                  return (
                    <View key={index}>
                      <ChatUser text={el.question}/>
                      <ChatAi text={el.answer} />
                    </View>
                  )
                })}
              </View>
            </ScrollView>
          </View>
          <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
            <TextInput
              style={styles.input}
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              placeholder="Ask me anything"
            />
            <TouchableOpacity style={styles.button} onPress={handleInput}>
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
    width: "100%"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    flex: 1,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bot: {
    fontSize: 16,
  }
});
