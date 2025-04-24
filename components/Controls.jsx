import { Button, View } from "react-native"

export const Controls = ({isRunning, onPause, onStart, onReset}) =>{
    return(
        <View>
            <Button
            title={isRunning ? "Pause" : "Start"}
            onPress={isRunning ? onPause : onStart}

            />
            <Button 
            title="Reset"
            onPress={onReset}
            />
        </View>
    )
}