class Modal {
  modal: HTMLElement;
  flag: boolean;
  constructor(modal: HTMLElement) {
    this.modal = modal;
    this.modal.style.display = "none";
    this.flag = false;
  }

  show() {
    if (this.flag) return;
    this.modal.style.display = "";
    this.flag = true;
    setTimeout(() => {
      this.modal.style.display = "none";
      this.flag = false;
    }, 3 * 1000);
  }
}

export default Modal;
