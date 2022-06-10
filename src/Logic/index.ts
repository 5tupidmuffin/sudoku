import { getRandomArbitrary } from "../utils";
import sudokuSolver, { isSudokuBoardValid, isCellValid } from "./logic.solver";

export default class Logic {
  board: number[];

  constructor(board: number[] = []) {
    this.board = board.length ? board : this.generateBoard();
  }

  updateValue(index: number, value: number) {
    this.board[index] = value;
  }

  isFilled(): boolean {
    for (let i = 0; i < 81; i++) {
      if (this.board[i] === 0) return false;
    }
    return true;
  }

  isCellValid(index: number): boolean {
    return isCellValid(this.board, index);
  }

  isBoardValid(): boolean {
    return isSudokuBoardValid(this.board);
  }

  solve(board: number[] = this.board) {
    sudokuSolver(board);
  }

  generateBoard() {
    const tempBoard = new Array(81).fill(0);
    const indexes: number[] = [];
    const values: number[] = [];

    for (let i = 0; i < 5; i++) {
      let index = getRandomArbitrary(0, 81);
      while (indexes.includes(index)) {
        index = getRandomArbitrary(1, 9);
      }
      indexes.push(index);
    }

    for (let i = 0; i < 5; i++) {
      let value = getRandomArbitrary(1, 9);
      while (values.includes(value)) {
        value = getRandomArbitrary(1, 9);
      }
      values.push(value);
    }

    for (let i = 0; i < 5; i++) {
      tempBoard[indexes[i]] = values[i];
    }

    this.solve(tempBoard);

    for (let i = 0; i < 81; i++) {
      if (Math.random() > 0.7) {
        tempBoard[i] = 0;
      }
    }

    return tempBoard;
  }

  generateRandomBoard() {
    for (let i = 0; i < 81; i++) {
      this.board[i] = getRandomArbitrary(0, 9);
    }
    return this.board;
  }
}
