import { WordModel } from "../models/verbModel"
import * as dataVerbs from '../db/dataVerbs.json';
import { randomOrderArrayVerbs } from "../commons/helpers/prayersHelper";


export const getPastTenses = async (): Promise<WordModel[]> => {
    return randomOrderArrayVerbs(dataVerbs.pastTense);
}
export const getVerbPresents = async (): Promise<WordModel[]> => {
    return randomOrderArrayVerbs(dataVerbs.verbPresent);
}
export const getFutureVerbs = async (): Promise<WordModel[]> => {
    return randomOrderArrayVerbs(dataVerbs.futureVerbs);
}

