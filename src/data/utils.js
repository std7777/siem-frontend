let idCtr = 1000;
export function uid() {
  idCtr += 1;
  return idCtr;
}

export function now() {
  return new Date().toLocaleTimeString("en-IN", { hour12: false });
}

export function rand(arr) {
  const i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

export function randInt(a, b) {
  const n = b - a + 1;
  const off = Math.floor(Math.random() * n);
  return a + off;
}

export function categoryKey(value) {
  const v = String(value || "");
  return v.toLowerCase().replace(/[^a-z0-9]/g, "");
}
