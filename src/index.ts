import Clock from "./Clock";

const minuteDis = document.querySelector("#minute");
const secondDis = document.querySelector("#second");

const clock = new Clock(minuteDis, secondDis);
clock.start();
