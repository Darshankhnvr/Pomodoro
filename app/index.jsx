import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';
import { TimerDisplay } from '../components/TimerDisplay';
import { Controls } from '../components/Controls';

export default function HomeScreen() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // Default: 25 minutes work
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [workDuration, setWorkDuration] = useState(25); // Custom work duration (in minutes)
  const [breakDuration, setBreakDuration] = useState(5); // Custom break duration (in minutes)
  const [sound, setSound] = useState();

  useEffect(() => {
    let interval;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      playSound();
      clearInterval(interval);
      if (mode === 'work') {
        setMode('break');
        setSecondsLeft(breakDuration * 60); // Switch to break duration
      } else {
        setMode('work');
        setSecondsLeft(workDuration * 60); // Switch to work duration
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, mode, workDuration, breakDuration]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/beep.wav'));
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <TimerDisplay seconds={secondsLeft} />
      
      <Text className="text-lg">Work Duration (minutes):</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', textAlign: 'center' }}
        keyboardType="numeric"
        value={String(workDuration)}
        onChangeText={(text) => setWorkDuration(Number(text))}
      />

      <Text className="text-lg">Break Duration (minutes):</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%', textAlign: 'center' }}
        keyboardType="numeric"
        value={String(breakDuration)}
        onChangeText={(text) => setBreakDuration(Number(text))}
      />
      
      <Controls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setSecondsLeft(workDuration * 60); // Reset to custom work duration
          setMode('work');
          setIsRunning(false);
        }}
      />
    </View>
  );
}
