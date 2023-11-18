import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button } from "react-native-paper";

export default function MoodButton({ setMoodsRating, moodsRating, index, navigation, navigate }) {
  return (
    <Button
      icon={({ color, size }) => (
        <MaterialCommunityIcons
          name={moodsRating[index].emote}
          size={50}
          color={moodsRating[index].pressed ? moodsRating[index].colorWhenPressed : moodsRating[index].color}
          onPress={() => {
            let prevMood = moodsRating.map((el, idx) => {
              el.pressed = false
              if (idx == index){
                el.pressed = true
              }
              return el
            })
            
            setMoodsRating([...prevMood])

            if(navigate){
              navigation.navigate("JournalPage", { mood: prevMood })
            }
          }}
        />
      )}
    />
  );
}
