import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";

export default function MoodButton({ setMoodsRating, moodsRating, index, navigation, navigate }) {
  const  getQuote = useMainStore((state) => state.getQuote)
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
            getQuote()
            console.log(prevMood)
            if(navigate){
              navigation.navigate("JournalPage", { mood: prevMood })
            }
          }}
        />
      )}
    />
  );
}
