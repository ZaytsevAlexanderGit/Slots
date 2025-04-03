import { SlotType } from '../assets/stores/slots-data/state.ts';
// import { winCombinationsObject } from './constants.ts';
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

//update state with winning numbers
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

//all in function name
export function toUpperFirstLetterCase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

//create file path name for project images
export function getImgUrl(folderName: SlotType, fileName: string): string {
  const ext = 'png';
  const address = `../assets/images/${folderName}/${fileName}.${ext}`;
  const imgUrl = new URL(address, import.meta.url).href;
  return imgUrl;
}

// function for check winning combinations according to predefined combinations (in constants.ts file)
// NOT IN USE FOR NOW
// export function checkWinningCombinations(data: number[][]): void {
//   let ret: { type: string; value: number; combination: number[][] }[] = [
//     { type: 'blank', value: -1, combination: [[]] },
//   ];
//   winCombinationsObject.forEach((el) => {
//     let flag = 0;
//     let check = -1;
//     el.combination.forEach((elem, index) => {
//       if (index === 0) {
//         check = data[elem[0]][elem[1]];
//       } else {
//         if (check !== data[elem[0]][elem[1]]) {
//           flag = 1;
//         }
//       }
//     });
//     if (flag === 0) {
//       let flag2 = 0;
//       ret.forEach((elem) => {
//         if (elem.type === el.type && el.value > elem.value) {
//           flag2 = 1;
//           ret = ret.filter((data) => data.type !== elem.type);
//           ret.push(el);
//         }
//       });
//       if (flag2 === 0) {
//         ret.push(el);
//       }
//     }
//   });
//   ret = ret.slice(1);
//   const finalData = {
//     value: -1,
//     combination: [[[]]] as number[][][],
//   };
//   ret.forEach((element) => {
//     finalData.value += element.value;
//     finalData.combination.push(element.combination);
//   });
//   setTimeout(
//     () => {
//       SlotsState.setState((state) => ({
//         balance: state.balance + finalData.value,
//       }));
//     },
//     SlotsState.getState().rollDuration * 1000 +
//       (SlotsState.getState().slotsSizeRow +
//         SlotsState.getState().slotsSizeCol -
//         2) *
//         100
//   );
//   SlotsState.setState({
//     winingCells: finalData.combination.slice(1),
//   });
// }

// function for finding winning combinations. Check All rows, and possible both ways diagonals
// IN USE FOR NOW
export function findWinningCombinations(data: number[][]): void {
  const ret = [] as { value: number; combination: number[][] }[];

  //check winning row combination's
  for (let row = 0; row < data.length; row++) {
    const check: [number, number, number[][]] = [data[row][0], 1, [[row, 0]]];
    for (let col = 1; col < data[row].length; col++) {
      if (data[row][col] === check[0]) {
        check[1]++;
        check[2].push([row, col]);
      } else break;
    }
    if (check[1] >= 3) {
      const val = ((check[1] - 2) * (check[1] - 1)) / 2;
      ret.push({ value: val, combination: check[2] });
    }
  }

  //check diagonals winning combination's
  for (let row = 0; row < data.length; row++) {
    if (row - 1 >= 0) {
      const diagUp = checkDiagonal(data, row, -1);
      if (diagUp !== undefined) ret.push(diagUp);
    }
    if (row + 1 <= data.length - 1) {
      const diagDown = checkDiagonal(data, row, 1);
      if (diagDown !== undefined) ret.push(diagDown);
    }
  }

  //finalise result
  const finalData = {
    value: -1,
    combination: [[[]]] as number[][][],
  };

  ret.forEach((element) => {
    finalData.value += element.value;
    finalData.combination.push(element.combination);
  });

  setTimeout(
    () => {
      SlotsState.setState((state) => ({
        balance: state.balance + finalData.value,
      }));
    },
    SlotsState.getState().rollDuration * 1000 +
      (SlotsState.getState().slotsSizeRow +
        SlotsState.getState().slotsSizeCol -
        2) *
        100
  );
  SlotsState.setState({
    winingCells: finalData.combination.slice(1),
  });
}

//function for check if there is winning diagonal
function checkDiagonal(
  data: number[][],
  startRow: number,
  startDirection: -1 | 1
): { value: number; combination: number[][] } | undefined {
  const check: [number, number, number[][]] = [
    data[startRow][0],
    1,
    [[startRow, 0]],
  ];
  let nextRow = startRow + startDirection;
  if (nextRow === 0 || nextRow === data.length - 1) startDirection *= -1;
  for (let col = 1; col < data[startRow].length; col++) {
    if (data[nextRow][col] === check[0]) {
      check[1]++;
      check[2].push([nextRow, col]);
    } else break;
    nextRow = nextRow + startDirection;
    if (nextRow === 0 || nextRow === data.length - 1) startDirection *= -1;
  }
  if (check[1] >= 3) {
    const val = ((check[1] - 2) * (check[1] - 1)) / 2;
    return { value: val, combination: check[2] };
  }
}
