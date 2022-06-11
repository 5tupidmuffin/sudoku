export default class Board {
  cells: Element[];
  highlightedCellIndex: null | number;
  constructor(cells: Element[]) {
    this.cells = cells;
    this.highlightedCellIndex = null;
  }

  fillBoard(values: number[]) {
    for (let i = 0; i < 81; i++) {
      if (values[i]) {
        this.cells[i].textContent = (<unknown>values[i]) as string;
        this.cells[i].classList.add("preFilledCell");
      } else {
        this.cells[i].textContent = "";
        this.cells[i].classList.remove("preFilledCell");
      }
    }
  }

  isPrefilled(index: number) {
    return this.cells[index].classList.contains("preFilledCell");
  }

  highlightCell(index: number) {
    this.cells[index].classList.add("highlightedCell");
    this.highlightedCellIndex = index;
  }

  markInvalid(index: number) {
    this.cells[index].classList.add("invalid");
  }

  removeHighlight() {
    if (this.highlightedCellIndex === null) return;
    this.cells[this.highlightedCellIndex].classList.remove("highlightedCell");
    this.cells[this.highlightedCellIndex].classList.remove("invalid");
  }

  updateValue(index: number, value: number) {
    if (this.isPrefilled(index))
      throw new Error(`tried to update prefilled cell: ${index}`);
    this.cells[index].textContent = (<unknown>value) as string;
  }

  removeValue(index: number, value: number) {
    if (this.isPrefilled(index))
      throw new Error(`tried to update prefilled cell: ${index}`);
    this.cells[index].textContent = "";
  }

  resetBoard() {
    for (let i = 0; i < 81; i++) {
      this.cells[i].classList.remove("highlightedCell");
      this.cells[i].classList.remove("invalid");
      if (!this.cells[i].classList.contains("preFilledCell")) {
        this.cells[i].textContent = "";
      }
    }
  }

  clearBoard() {
    for (let i = 0; i < 81; i++) {
      this.cells[i].classList.remove("invalid");
      this.cells[i].classList.remove("preFilledCell");
      this.cells[i].classList.remove("highlightedCell");
    }
  }
}
