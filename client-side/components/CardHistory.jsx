import {Card} from 'react-native-paper';
import {Text, View, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function CardHistory(){
    return(
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.cardContentWrapper}>
                <MaterialCommunityIcons name="emoticon-happy-outline" size={50} color="#FFC947" />
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Happy</Text>
                </View>
                    <Text style={{fontSize: 15, textAlign: "right"}}>Today, 10:00 AM</Text>
                
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 5,
    },
    cardContentWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    
})