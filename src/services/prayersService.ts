import { randomPrayer } from '../commons/helpers/prayersHelper';
import * as dataPrayers from '../db/dataPrayers.json';
import { Prayers } from '../models/prayersModel';

export const getPrayers = async (): Promise<Prayers[]> => {
    return dataPrayers.prayers;
}
export const getPrayerRandom = async (): Promise<Prayers> => {
    return randomPrayer(dataPrayers.prayers);
}

