const CryptoJS = require('crypto-js');

// Hash a string with a key
export function hashString(inputString: string, key: string) {
  const hashedString = CryptoJS.HmacSHA256(inputString, key).toString(
    CryptoJS.enc.Hex,
  );
  return hashedString;
}

// Decode a hashed string using the same key
export function decodeHashedString(hashedString: string, key: string) {
  const bytes = CryptoJS.HmacSHA256(hashedString, key);
  const originalString = bytes.toString(CryptoJS.enc.Utf8);
  return originalString;
}

const inputString = 'OX9N9aVtWGbRMsB4cM3w';
const key = 'yourSecretKey';

// Hash the input string
const hashedString = hashString(inputString, key);
console.log('Hashed String:', hashedString);

// Decode the hashed string
const decodedString = decodeHashedString(hashedString, key);
console.log('Decoded String:', decodedString);
