import { ImageBackground, View } from "react-native";
import { Card, Text, IconButton, MD3Colors } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

export default function CardPage({ item }) {
    const quote = useMainStore((state) => state.quote);
    const serverUrl = useMainStore((state) => state.serverUrl);

    const [sound, setSound] = useState();
    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync({ uri: `${serverUrl}/public/music/${quote[0].voiceFile}` });
        setSound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return sound
            ? () => {
                  console.log("Unloading Sound");
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

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

const styles = {
    card: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        margin: 16
    },
    imageBackground: {
        resizeMode: "cover",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 3)"
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    }
};
