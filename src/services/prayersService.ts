import { randomPrayer } from '../commons/helpers/prayersHelper';
import * as dataPrayers from '../db/dataPrayers.json';
import * as dataPrayersTranslation from '../db/dataTranslation.json';
import { Prayers, PrayersTranslation } from '../models/prayersModel';

export const getPrayers = async (): Promise<Prayers[]> => {
    return dataPrayers.prayers;
}
export const getPrayerRandom = async (): Promise<Prayers> => {
    return randomPrayer(dataPrayers.prayers);
}

export const getPrayerTranslation = async (id: number): Promise<PrayersTranslation | undefined> => {
    let result = dataPrayersTranslation.translations.find(item => item.id === id)
    return result;
}

