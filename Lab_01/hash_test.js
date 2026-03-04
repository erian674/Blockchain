console.log("LAB-01 HELLO WORLD");

const crypto = require('crypto');

function createSHA256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

console.log('=== THUC HANH: SHA-256 HASHING ===');
const input1 = "Tui ten Nhu";
const input2 = "Tui ten Arian";
const input3 = "Tui ten Quynh Nhu";
const input4 = "Tui hoc 22DTH6";

const hash1 = createSHA256(input1);
const hash2 = createSHA256(input2);
const hash3 = createSHA256(input3);
const hash4 = createSHA256(input4);

console.log('DU LIEU GOC: ');
console.log(`Input1: ${input1}`);
console.log(`Input2: ${input2}`);
console.log(`Input3: ${input3}`);
console.log(`Input4: ${input4}`);

console.log('MA HASH: ');
console.log(`Hash1: ${hash1}`);
console.log(`Hash2: ${hash2}`);
console.log(`Hash3: ${hash3}`);
console.log(`Hash4: ${hash4}`);

console.log('PHAN TICH: ');
console.log(hash1.length + " ky tu");
