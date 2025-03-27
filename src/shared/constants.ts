type winComb = {
  type: string;
  value: number;
  combination: number[][];
};

export const winCombinations: number[][][] = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],

  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
];

export const winCombinationsObject: winComb[] = [
  {
    type: '1row',
    value: 1,
    combination: [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
  },
  {
    type: '2row',
    value: 1,
    combination: [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  },
  {
    type: '3row',
    value: 1,
    combination: [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  },
  {
    type: 'rDiag',
    value: 1,
    combination: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
  },
  {
    type: 'lDiag',
    value: 1,
    combination: [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  },
  {
    type: '1row',
    value: 3,
    combination: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  },
  {
    type: '2row',
    value: 3,
    combination: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
  },
  {
    type: '3row',
    value: 3,
    combination: [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
  },
  {
    type: 'rDiag',
    value: 3,
    combination: [
      [0, 0],
      [1, 1],
      [2, 2],
      [1, 3],
    ],
  },
  {
    type: 'lDiag',
    value: 3,
    combination: [
      [2, 0],
      [1, 1],
      [0, 2],
      [1, 3],
    ],
  },
  {
    type: '1row',
    value: 6,
    combination: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
  },
  {
    type: '2row',
    value: 6,
    combination: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },
  {
    type: '3row',
    value: 6,
    combination: [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
    ],
  },
  {
    type: 'rDiag',
    value: 6,
    combination: [
      [0, 0],
      [1, 1],
      [2, 2],
      [1, 3],
      [0, 4],
    ],
  },
  {
    type: 'lDiag',
    value: 6,
    combination: [
      [2, 0],
      [1, 1],
      [0, 2],
      [1, 3],
      [2, 4],
    ],
  },
];
