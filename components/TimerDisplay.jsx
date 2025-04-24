import { Text, View } from "react-native";

export const TimerDisplay =({seconds}) =>{
    const formatTime= (sec) =>{
        const minutes = Math.floor(sec /60)
        const remainingSeconds = sec % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
    }
    return(
        <View>
            <Text>{formatTime(seconds)}</Text>
        </View>
    )
}