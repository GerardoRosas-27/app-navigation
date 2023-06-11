import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

const AudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const startRecording = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      console.log('Permission to record audio denied');
      return;
    }

    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording?.stopAndUnloadAsync();
      setIsRecording(false);
      console.log('Recording stopped');
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    } else if (recording) {
      const { sound: newSound } = await recording.createNewLoadedSoundAsync();
      setSound(newSound);
      await newSound.playAsync();
    }
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button title="Play Sound" onPress={playSound} disabled={!sound && !recording} />
      <Text>{isRecording ? 'Recording in progress...' : 'Press the button to start recording.'}</Text>
    </View>
  );
};

export default AudioRecorder;
