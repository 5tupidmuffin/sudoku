export default class Clock {
  time: number;
  flag: any;
  minuteDis: Element;
  secondDis: Element;

  constructor(
    minuteDis: Element,
    secondDis: Element,
    minutes = 0,
    seconds = 0
  ) {
    this.time = minutes * 60 + seconds;
    this.flag = null;
    this.minuteDis = minuteDis;
    this.secondDis = secondDis;
  }

  start() {
    if (this.flag) return;
    this.flag = setInterval(() => {
      this.time += 1;
      const time = this.getTime();
      this.minuteDis.textContent = `${time.minutes}M`;
      this.secondDis.textContent = `${time.seconds}S`;
    }, 1 * 1000);
  }

  pause() {
    clearInterval(this.flag);
  }
  reset() {
    this.pause();
    this.time = 0;
  }
  getTime() {
    return {
      minutes: Math.floor(this.time / 60),
      seconds: this.time % 60,
    };
  }
}
