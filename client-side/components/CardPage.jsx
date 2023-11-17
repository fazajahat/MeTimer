import { Card, Text } from "react-native-paper";

export default function CardPage() {
  return (
    <Card style={styles.card}>
    <Card.Content style={{ width: 345 }}>
      <Text variant="titleLarge">Quotes of the day</Text>
      <Text variant="bodyMedium">Lorem ipsum dolor sit amet 
      consectetur adipisicing elit. Deserunt, 
      iure asperiores. Nesciunt et dolor tenetur. A ad, 
      recusandae, ipsa odit ullam laudantium mollitia quisquam sed 
      omnis voluptatum eum veniam vel.
      </Text>
    </Card.Content>
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
  };