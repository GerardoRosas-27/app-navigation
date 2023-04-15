import { Prayers } from "../../models/prayersModel";

export const randomPrayer = (data: Prayers[]): Prayers => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomObject = data[randomIndex];
  return randomObject
}
// convert object to Array string[] Prayer
export const transformObjetToArrayPrayer = (obj: Prayers): string[] => {
  const arr = Object.values(obj);

  const strArr = arr.map(value => {
    if (typeof value === "string") {
      return `${value}`; // Si el valor es una cadena, agregamos comillas dobles.
    }
    return value;
  });
  return strArr
}

export const randomOrderArray = (array: string[]): string[] => {
  array.sort(() => Math.random() - 0.5);
  return array
} 