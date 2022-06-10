// sudoku solver
// https://www.geeksforgeeks.org/sudoku-backtracking-7/  --- 2D Array based

const sudokuSolver = (board: number[]): boolean => {
  const emptyCell = getEmptyCellIndex(board);
  if (emptyCell === null) return true;

  for (let i = 1; i < 10; i++) {
    if (isSafe(board, emptyCell, i)) {
      board[emptyCell] = i;

      if (sudokuSolver(board)) return true;
      board[emptyCell] = 0;
    }
  }

  return false;
};

const getEmptyCellIndex = (board: number[]): number => {
  for (let i = 0; i < 81; i++) {
    if (board[i] === 0) return i;
  }
  return null;
};

const isInRow = (board: number[], index: number, value: number): boolean => {
  let tempIndex = index;
  // left
  while (tempIndex % 9 > 0) {
    tempIndex -= 1;
    if (board[tempIndex] === value) return true;
  }

  tempIndex = index;

  // right
  while (tempIndex % 9 < 8) {
    tempIndex += 1;
    if (board[tempIndex] === value) return true;
  }

  return false;
};

const isInColumn = (board: number[], index: number, value: number): boolean => {
  let tempIndex = index;
  // up
  while (tempIndex > 0) {
    tempIndex -= 9;
    if (board[tempIndex] === value) return true;
  }

  tempIndex = index;

  while (tempIndex < 81) {
    tempIndex += 9;
    if (board[tempIndex] === value) return true;
  }

  return false;
};

const isInBox = (board: number[], index: number, value: number): boolean => {
  // geeksForGeeks' subgrid check function is error prone :(
  const tempBoard = [];
  let tempIndex = index;

  // left
  while (tempIndex % 3 > 0 && tempIndex >= 0) {
    tempIndex -= 1;
    tempBoard.push(board[tempIndex]);
  }

  tempIndex = index;

  // right
  while (tempIndex % 3 < 2 && tempIndex < 81) {
    tempIndex += 1;
    tempBoard.push(board[tempIndex]);
  }

  // up
  tempIndex =
    index % 3 === 0 ? index - 7 : index % 3 === 1 ? index - 8 : index - 9;

  while (
    tempIndex >= 0 &&
    getSubgridIndex(tempIndex) === getSubgridIndex(index)
  ) {
    while (
      tempIndex >= 0 &&
      getSubgridIndex(tempIndex) === getSubgridIndex(index)
    ) {
      tempBoard.push(board[tempIndex]);
      tempIndex -= 1;
    }

    tempIndex = tempIndex - 6;
  }

  tempIndex =
    index % 3 === 0 ? index + 9 : index % 3 === 1 ? index + 8 : index + 7;

  // down
  while (
    tempIndex < 81 &&
    getSubgridIndex(tempIndex) === getSubgridIndex(index)
  ) {
    while (
      tempIndex < 81 &&
      getSubgridIndex(tempIndex) === getSubgridIndex(index)
    ) {
      tempBoard.push(board[tempIndex]);
      tempIndex += 1;
    }

    tempIndex = tempIndex + 6;
  }

  return tempBoard.includes(value);
};

const getSubgridIndex = (index: number) => {
  /* 
    Math.floor(IDX / 27) === subgrid row number
    Math.floor((IDX / 3) % 3) === subgrid column number
  */
  const rowIndex = Math.floor(index / 27);
  const columnIndex = Math.floor((index / 3) % 3);
  return rowIndex * 3 + columnIndex;
};

const isSafe = (board: number[], index: number, value: number): boolean => {
  return (
    !isInRow(board, index, value) &&
    !isInColumn(board, index, value) &&
    !isInBox(board, index, value)
  );
};

export const isCellValid = (board: number[], index: number) => {
  if (
    isInRow(board, index, board[index]) ||
    isInColumn(board, index, board[index]) ||
    isInBox(board, index, board[index])
  ) {
    return false;
  } else {
    return true;
  }
};

export const isSudokuBoardValid = (board: number[]): boolean => {
  for (let i = 0; i < 81; i++) {
    if (!isCellValid(board, i)) return false;
  }
  return true;
};

// prettier-ignore
const testBoard = [
  5, 3, 0, 0, 7, 0, 0, 0, 0,
  6, 0, 0, 1, 9, 5, 0, 0, 0,
  0, 9, 8, 0, 0, 0, 0, 6, 0,
  8, 0, 0, 0, 6, 0, 0, 0, 3,
  4, 0, 0, 8, 0, 3, 0, 0, 1,
  7, 0, 0, 0, 2, 0, 0, 0, 6, 
  0, 6, 0, 0, 0, 0, 2, 8, 0, 
  0, 0, 0, 4, 1, 9, 0, 0, 5, 
  0, 0, 0, 0, 8, 0, 0, 7, 9, 
];

// prettier-ignore
const testSolution = [
  5, 3, 4, 6, 7, 8, 9, 1, 2,
  6, 7, 2, 1, 9, 5, 3, 4, 8,
  1, 9, 8, 3, 4, 2, 5, 6, 7,
  8, 5, 9, 7, 6, 1, 4, 2, 3,
  4, 2, 6, 8, 5, 3, 7, 9, 1,
  7, 1, 3, 9, 2, 4, 8, 5, 6,
  9, 6, 1, 5, 3, 7, 2, 8, 4,
  2, 8, 7, 4, 1, 9, 6, 3, 5,
  3, 4, 5, 2, 8, 6, 1, 7, 9,
];

// prettier-ignore
const testBoard2 = [
  0, 0, 1, 0, 5, 0, 6, 3, 0,
  3, 0, 0, 0, 7, 8, 0, 5, 0,
  0, 0, 5, 4, 6, 0, 7, 0, 0,
  2, 5, 0, 0, 0, 0, 0, 4, 7,
  0, 1, 0, 0, 0, 7, 0, 0, 0,
  7, 0, 6, 0, 0, 4, 0, 0, 0, 
  1, 4, 2, 8, 0, 0, 5, 0, 0, 
  6, 3, 7, 0, 4, 0, 8, 1, 0, 
  0, 0, 8, 0, 1, 0, 0, 2, 0, 
];

// prettier-ignore
const solution2 = [
  8, 7, 1, 9, 5, 2, 6, 3, 4,
  3, 6, 4, 1, 7, 8, 9, 5, 2,
  9, 2, 5, 4, 6, 3, 7, 8, 1,
  2, 5, 9, 6, 8, 1, 3, 4, 7,
  4, 1, 3, 5, 9, 7, 2, 6, 8,
  7, 8, 6, 3, 2, 4, 1, 9, 5,
  1, 4, 2, 8, 3, 9, 5, 7, 6,
  6, 3, 7, 2, 4, 5, 8, 1, 9,
  5, 9, 8, 7, 1, 6, 4, 2, 3
]

export default sudokuSolver;
