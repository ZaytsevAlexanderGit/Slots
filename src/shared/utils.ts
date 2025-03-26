import { SlotType } from '../assets/stores/slots-data/state.ts';
import { winCombinations } from './constants.ts';
import { SlotsState } from '../assets/stores/state.ts';

export function shuffle(array: number[]): number[] {
  // const ret = [array[0]];
  const ret = [array[array.length - 1]];
  // const other = array.slice(1);
  const other = array.slice(0, array.length - 1);
  for (let i = other.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [other[i], other[j]] = [other[j], other[i]];
  }
  // return ret.concat(other);
  return other.concat(ret);
}

export function createInitialArrayComplex(
  sizeRow: number,
  sizeCol: number,
  val: number
): number[][] {
  return Array.from({ length: sizeRow }, () => Array(sizeCol).fill(val));
}

function createRandomArray(variants: number, value: number): number[] {
  let ret = [
    ...new Array(variants * 2)
      .fill(0)
      .map(() => Math.ceil(Math.random() * variants)),
    value,
  ];
  ret = shuffle(ret);
  return ret;
}

export function createInitialArrayAllData(
  sizeRow: number,
  sizeCol: number
): number[][][] {
  const ret: number[][][] = Array.from({ length: sizeRow }, () =>
    Array(sizeCol).fill(0)
  );
  ret.forEach((row, indRow) => {
    row.forEach((_, indCol) => {
      ret[indRow][indCol] = createRandomArray(
        SlotsState.getState().slotsVariants,
        SlotsState.getState().firstNumbers[indRow][indCol]
      );
    });
  });
  return ret;
}

export function setWinningDataToState(data: number[][][]) {
  const updatedFirstNumbers = createInitialArrayComplex(
    data.length,
    data[0].length,
    0
  );
  for (let row = 0; row < SlotsState.getState().slotsSizeRow; row++) {
    for (let col = 0; col < SlotsState.getState().slotsSizeCol; col++) {
      updatedFirstNumbers[row][col] = data[row][col][0];
    }
  }

  SlotsState.setState(() => ({
    firstNumbers: updatedFirstNumbers,
  }));
}

export function toUpperFirstLetterCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export function getImgUrl(folderName: SlotType, fileName: string): string {
  const ext = 'png';
  const address = `../assets/images/${folderName}/${fileName}.${ext}`;
  const imgUrl = new URL(address, import.meta.url).href;
  return imgUrl;
}

export function checkWinningCombinations(data: number[][]): void {
  const ret: number[][][] = [[[]]];
  winCombinations.forEach((el) => {
    let flag = 0;
    let check = -1;
    el.forEach((elem, index) => {
      if (index === 0) {
        check = data[elem[0]][elem[1]];
      } else {
        if (check !== data[elem[0]][elem[1]]) {
          flag = 1;
        }
      }
    });
    if (flag === 0) {
      ret.push(el);
    }
  });
  SlotsState.setState({
    winingCells: ret.slice(1),
  });
}
