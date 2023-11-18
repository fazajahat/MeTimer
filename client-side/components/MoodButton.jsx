import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button } from "react-native-paper";

export default function MoodButton({ name, press }) {
  return (
    <Button
      icon={({ color, size }) => (
        <MaterialCommunityIcons
          name={name}
          size={50}
          color={color}
          onPress={() => console.log(press)}
        />
      )}
    />
  );
}
