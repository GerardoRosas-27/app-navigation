import { randomPrayer } from '../commons/helpers/prayersHelper';
import * as dataPrayers from '../db/dataPrayers.json';
import * as dataPrayersTranslation from '../db/dataTranslation.json';
import { Prayers, PrayersTranslation } from '../models/prayersModel';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

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



export const getPlayAudio = async (filename: string) => {
    const soundObject = new Audio.Sound();
    const audioFile = Asset.fromModule(require(`../../assets/audios/${filename}`));
    //const audioFile = require("../../assets/audios/" + filename);
    //const audioFile = require(`../../assets/audios/audio1.mp3`);
    try {
        await soundObject.loadAsync(audioFile);
        await soundObject.playAsync();
    } catch (error) {
        console.log(error);
    }
};

