import { Card, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
export default function ChatUser({ text }) {
    return (
        <Card style={styles.userCard}>
            <Card.Content>
                <Text>{ text }</Text>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    userCard: {
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        margin: 10,
        maxWidth: "70%",
        alignSelf: "flex-end",
    }
})