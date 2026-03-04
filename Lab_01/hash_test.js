// In tiêu đề bài Lab ra màn hình console
console.log("LAB-01 HELLO WORLD");

// Nhập thư viện crypto để có các công cụ mã hóa dữ liệu
const crypto = require('crypto');

function createSHA256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

console.log('=== THUC HANH: SHA-256 HASHING ===');

// Khai báo các chuỗi dữ liệu khác nhau để thử nghiệm tính duy nhất của mã Hash
const input1 = "Tui ten Nhu";
const input2 = "Tui ten Arian";
const input3 = "Tui ten Quynh Nhu";
const input4 = "Tui hoc 22DTH6";

// Gọi hàm băm cho từng dữ liệu đầu vào
const hash1 = createSHA256(input1);
const hash2 = createSHA256(input2);
const hash3 = createSHA256(input3);
const hash4 = createSHA256(input4);

// Hiển thị dữ liệu gốc ban đầu để đối chiếu
console.log('DU LIEU GOC: ');
console.log(`Input1: ${input1}`);
console.log(`Input2: ${input2}`);
console.log(`Input3: ${input3}`);
console.log(`Input4: ${input4}`);

// Hiển thị kết quả sau khi băm (mỗi Input sẽ cho ra một mã Hash riêng biệt)
console.log('MA HASH: ');
console.log(`Hash1: ${hash1}`);
console.log(`Hash2: ${hash2}`);
console.log(`Hash3: ${hash3}`);
console.log(`Hash4: ${hash4}`);

console.log('PHAN TICH: ');
// Kiểm tra độ dài của mã Hash (SHA-256 luôn trả về chuỗi có độ dài cố định)
console.log(hash1.length + " ky tu");