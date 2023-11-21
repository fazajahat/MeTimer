import {Card} from 'react-native-paper';
import {Text, View, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function CardHistory(){
    return(
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.cardContentWrapper}>
                    <View style={{width: '15%'}}>
                        <MaterialCommunityIcons name="emoticon-happy-outline" size={50} color="#FFC947" />
                    </View>
                    <View style={{ flexDirection: 'column', width: '85%'}}>
                        <Text numberOfLines={1} style={{fontSize: 20, fontWeight: "bold"}}>Happy </Text>
                        <Text numberOfLines={2} style={{fontSize: 12, alignSelf: 'flex-start',}}>As the day unfolded, I found myself immersed in the ebb and flow of life. The workday began with a groggy start, but the aroma of freshly brewed coffee breathed energy into my senses. With each sip, I contemplated the tasks ahead, setting the intention to embrace the day with an open heart.</Text>
                    </View>
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
        // justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
    },

    
})