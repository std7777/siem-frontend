let idCounter = 1000;
export const uid    = () => ++idCounter;
export const now    = () => new Date().toLocaleTimeString("en-IN", { hour12: false });
export const rand   = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
