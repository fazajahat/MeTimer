import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useMainStore } from "../stores/mainStore";
import { Text, View } from "react-native";

export default function DetailRecord({ navigation }) {
    const { id } = useRoute().params;
    const recordDetail = useMainStore((state) => state.recordDetail);

    const getRecordDetail = useMainStore((state) => state.getRecordDetail);

    useEffect(() => {
        console.log(id, "ini id params");
        getRecordDetail(id);
    }, []);
    return (
        <View>
            <Text>{JSON.stringify(recordDetail)}</Text>
        </View>
    );
}
