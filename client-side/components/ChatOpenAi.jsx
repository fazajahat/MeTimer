import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, SafeAreaView } from "react-native";
import axios from "axios";
import ChatAi from "./ChatAi";
import ChatUser from "./ChatUser";
import { useMainStore } from "../stores/mainStore";

export default function ChatFromAi() {
    //const chatLog = [{question: "How do you do?", answer: "You like me and i like you"}, {question: "Bagaimana bisa ku lupakan?", answer: "anda bisa melupakan dengan cinta"}]
    const chatLog = useMainStore((state) => state.chatLogs);
    const getChatLogs = useMainStore((state) => state.getChatLogs);
    const postChatLogs = useMainStore((state) => state.postChatLogs);
    const [textInput, setTextInput] = useState("");

    const handleInput = async () => {
        try {
            await postChatLogs(textInput);
            setTextInput("");
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getChatLogs();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Conseling With AI</Text>
                        <ScrollView style={{ height: "78%", backgroundColor: "pink", width: "100%" }}>
                            <View style={{ flexDirection: "column", padding: 10 }}>
                                {chatLog.map((el, index) => {
                                    return (
                                        <View key={index}>
                                            <ChatUser text={el.question} />
                                            <ChatAi text={el.answer} />
                                        </View>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
                        <TextInput style={styles.input} value={textInput} onChangeText={(text) => setTextInput(text)} placeholder="Ask me anything" />
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
        marginBottom: 10
    },
    body: {
        flex: 1,
        width: "100%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#000",
        width: "100%",
        height: 60,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10
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
        borderRadius: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000"
    },
    bot: {
        fontSize: 16
    }
});
