const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

export function createUnitshash(length: number = 8): string {
  if (length < 8 || length > 10) {
    throw new Error("unitshash length must be between 8 and 10 characters.");
  }

  const randomBytes = new Uint8Array(length);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(randomBytes);
  } else {
    for (let index = 0; index < length; index += 1) {
      randomBytes[index] = Math.floor(Math.random() * 256);
    }
  }

  let base36 = "";
  for (const byte of randomBytes) {
    base36 += DIGITS[byte % DIGITS.length];
  }

  return base36.slice(0, length);
}
