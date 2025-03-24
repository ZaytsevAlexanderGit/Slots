import { SlotType } from '../assets/stores/slots-data/state.ts';
import { useLayoutEffect, useState } from 'react';

export function shuffle(array: number[]): number[] {
  const ret = [array[0]];
  const other = array.slice(1);
  for (let i = other.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [other[i], other[j]] = [other[j], other[i]];
  }
  return ret.concat(other);
}

export function createInitialArrayComplex(
  sizeRow: number,
  sizeCol: number
): number[][] {
  return Array.from({ length: sizeRow }, () => Array(sizeCol).fill(0));
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

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
