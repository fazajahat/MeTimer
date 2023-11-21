import { Card, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export default function ChatAi({ text }) {
    return (
        <Card style={styles.aiCard}>
            <Card.Content>
                <Text>{ text }</Text>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    aiCard: {
        backgroundColor: "#DAF7A6",
        borderRadius: 10,
        margin: 10,
        maxWidth: "70%",
        alignSelf: "flex-start",
    }
})