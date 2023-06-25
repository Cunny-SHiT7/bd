import { random } from "remotion";

export const shuffleArray = (array: any, seed: string) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random(seed) * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const shuffleAndPickOne = (array: any, seed: string) => {
  shuffleArray(array, seed);
  return array[0];
}