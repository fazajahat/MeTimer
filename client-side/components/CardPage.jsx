import { ImageBackground, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function CardPage({ item }) {
  return (
    <Card style={styles.card}>
    <ImageBackground 
      source={{
        uri: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1700265600&semt=ais'
      }}
      style={styles.imageBackground}
    >
    <Card.Content style={{ width: 345 }}>
     <View style={styles.textContainer}>
      <Text variant="titleLarge" style={{ color: 'white'}}>Quotes of the day</Text>
      <Text variant="bodyMedium" style={{ paddingTop: 10, color: 'white'}}>{ item.text }</Text>
      <Text variant="bodyMedium" style={{ color: 'white'}}>Author: { item.author }</Text>
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
      margin: 16,             
    },
    imageBackground: {
      resizeMode: "cover", 
      borderRadius: 8,
      overflow: "hidden", 
      backgroundColor: "rgba(0, 0, 0, 3)", 
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16, 
    }
  };