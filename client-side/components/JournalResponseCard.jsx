import { Card, Text, IconButton, MD3Colors } from "react-native-paper";
import { ImageBackground, View } from "react-native";
import { useMainStore } from "../stores/mainStore";
import { Audio } from "expo-av";

export default function journalResponseCard() {
    return (
        <Card style={styles.card}>
            <ImageBackground
                source={{
                    uri: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1700265600&semt=ais"
                }}
                style={styles.imageBackground}>
                <Card.Content style={{ width: 345 }}>
                    <View style={styles.textContainer}>
                        <Text variant="bodyMedium" style={{ paddingTop: 10, color: "white" }}>
                            {item.quote}
                        </Text>
                    </View>
                    <View style={{ width: "auto" }}>
                        <IconButton icon="play-circle-outline" iconColor={MD3Colors.error99} size={27} onPress={playSound} style={{ alignSelf: "flex-end" }} />
                    </View>
                </Card.Content>
            </ImageBackground>
        </Card>
    );
}
