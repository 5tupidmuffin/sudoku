import Board from "./Board";
import Clock from "./Clock";
import Logic from "./Logic";

declare global {
  interface Window {
    logic: Logic;
    board: Board;
    enableDebugging: () => void;
  }
}

// clock setup
const minuteDis = document.querySelector("#minute");
const secondDis = document.querySelector("#second");
const cells = document.querySelectorAll(".cell");
const numberInputs = document.querySelectorAll(".numberInput");
let selectedCell: null | Element = null;
let selectedCellIndex: null | number = null;

const clock = new Clock(minuteDis, secondDis);
clock.start();

// boards setup
const board = new Board((<unknown>cells) as Element[]);
const logic = new Logic();

board.fillBoard(logic.board);

cells.forEach((cell, index) => {
  cell.addEventListener("click", (e) => {
    board.removeHighlight();
    selectedCell = null;
    selectedCellIndex = null;
    if (board.isPrefilled(index)) return;
    board.highlightCell(index);
    selectedCell = cell;
    selectedCellIndex = index;
  });
});

// input setup
numberInputs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedCell) {
      logic.updateValue(
        selectedCellIndex,
        btn.textContent === "X" ? 0 : Number(btn.textContent)
      );
      board.updateValue(
        selectedCellIndex,
        btn.textContent === "X" ? null : ((<unknown>btn.textContent) as number)
      );
      if (logic.isFilled()) {
        if (logic.isBoardValid()) {
          alert("Solved!");
          clock.pause();
        }
      }
    }
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  board.resetBoard();
  for (let i = 0; i < 81; i++) {
    if (!cells[i].classList.contains("preFilledCell")) {
      logic.updateValue(i, 0);
      selectedCell = null;
      selectedCellIndex = null;
    }
  }
});

document.querySelector("#validate").addEventListener("click", () => {
  for (let i = 0; i < 81; i++) {
    if (!cells[i].classList.contains("preFilledCell")) {
      if (logic.board[i] !== 0 && !logic.isCellValid(i)) {
        board.markInvalid(i);
      }
    }
  }
});

document.querySelector("#new").addEventListener("click", () => {
  logic.board = logic.generateBoard();
  board.clearBoard();
  board.fillBoard(logic.board);
  clock.reset();
  clock.start();
  selectedCell = null;
  selectedCellIndex = null;
});

const enableDebugging = (): void => {
  window.logic = logic;
  window.board = board;
};
window.enableDebugging = enableDebugging;
