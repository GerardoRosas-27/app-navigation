import { randomPrayer } from '../commons/helpers/prayersHelper';
import * as dataPrayers from '../db/dataPrayers.json';
import * as dataPrayersTranslation from '../db/dataTranslation.json';
import { Prayers, PrayersTranslation } from '../models/prayersModel';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Asset } from 'expo-asset';
import audioFilesData from '../../assets/audios/audioFiles.js';

type AudioFiles = {
    [key: string]: any;
  };
  const audioFiles: AudioFiles = audioFilesData;
export const getPrayers = async (): Promise<Prayers[]> => {
    return dataPrayers.prayers;
}
export const getPrayerRandom = async (): Promise<Prayers> => {
    return randomPrayer(dataPrayers.prayers);
}
// get funtion prayers translation Spanish
export const getPrayerTranslation = async (id: number): Promise<PrayersTranslation | undefined> => {
    let result = dataPrayersTranslation.translations.find(item => item.id === id)
    return result;
}
// get funtion prayers urls ingles
export const getPrayerVoices = async (id: number): Promise<PrayersTranslation | undefined> => {
    let result = dataPrayersTranslation.translations.find(item => item.id === id)
    return result;
}


/*
export const getPlayAudio = async (data: PrayersTranslation) => {
    const soundObject = new Audio.Sound();
    if (data) {
        try {
            console.log("data: ", data);

            // Solicita permiso para acceder a la biblioteca multimedia
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                const audioFile = FileSystem.documentDirectory + data.url;
                console.log("Loading audio file:", audioFile);
                await soundObject.loadAsync({ uri: audioFile });
                await soundObject.playAsync();
            } else {
                console.log("Permission to access media library not granted.");
            }
        } catch (error) {
            console.log(error);
        }
    }
};
*/
export const getPlayAudio = async (data: PrayersTranslation) => {
    const soundObject = new Audio.Sound();
    if (data) {
      try {
        console.log("data: ", data);
  
        // Carga el archivo de audio como un recurso
        const audioAsset = Asset.fromModule(audioFiles[data.url]);
        await audioAsset.downloadAsync();
  
        // Carga y reproduce el archivo de audio
        await soundObject.loadAsync(audioAsset);
        await soundObject.playAsync();
      } catch (error) {
        console.log(error);
      }
    }
  };

