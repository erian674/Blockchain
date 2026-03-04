const crypto = require('crypto');

// Hàm băm nhanh sử dụng thuật toán SHA-256
function quickHash(data) {
    return crypto.createHash('sha256')
                 .update(data)
                 .digest('hex');
}

console.log("=== THỰC HÀNH: MERKLE TREE ===\n");

// --- LỚP 0: DỮ LIỆU GỐC (TRANSACTIONS) ---
// Đây là các giao dịch thô chưa qua xử lý
let tx1 = "Giao dich A->B: 10 BTC";
let tx2 = "Giao dich C->D: 5 BTC";
let tx3 = "Giao dich E->F: 8 BTC";
let tx4 = "Giao dich G->H: 3 BTC";

console.log("TANSACTIONS LAYER (LỚP 0 - Dữ liệu gốc)");
console.log(`    TX1: ${tx1}`);
console.log(`    TX2: ${tx2}`);
console.log(`    TX3: ${tx3}`);
console.log(`    TX4: ${tx4}`);

// --- LỚP 1: HASH TỪNG GIAO DỊCH ---
// Mỗi giao dịch được băm để tạo ra một mã định danh duy nhất (Leaf Nodes)
let h1 = quickHash(tx1);
let h2 = quickHash(tx2);
let h3 = quickHash(tx3);
let h4 = quickHash(tx4);

console.log("\nHASH LAYER (Lớp 1 - Hash từng transaction): ");
console.log(`    H1 = hash(TX1) = ${h1}`);
console.log(`    H2 = hash(TX2) = ${h2}`);
console.log(`    H3 = hash(TX3) = ${h3}`);
console.log(`    H4 = hash(TX4) = ${h4}\n`);

// --- LỚP 2: GHÉP CẶP HASH (BRANCH LAYER) ---
// Gom 2 mã hash cạnh nhau rồi băm tiếp để tạo ra "nhánh" của cây
let h12 = quickHash(h1 + h2); // Nhánh trái
let h34 = quickHash(h3 + h4); // Nhánh phải

console.log("BRANCH LAYER (Lớp 2 - Ghép cặp hash): ");
console.log(`    H12 = hash(h1+h2) = ${h12}`);
console.log(`    H34 = hash(h3+h4) = ${h34}\n`);

// --- LỚP 3: MERKLE ROOT (ĐỈNH CÂY) ---
// Mã băm cuối cùng đại diện cho toàn bộ các giao dịch trong khối
let merkleRoot = quickHash(h12 + h34);

console.log("MERKLE ROOT (Lớp 3 - Ghép cặp hash): ");
console.log(` Root = hash(h12+h34) = ${merkleRoot}`);

// --- PHẦN KIỂM TRA TÍNH TOÀN VẸN (INTEGRITY TEST) ---
console.log("\n--- KIỂM TRA KHI THAY ĐỔI DỮ LIỆU ---");

// Giả sử kẻ gian sửa số tiền từ 10 BTC thành 100 BTC ở TX1
let tx1_modified = "Giao dich A->B: 100 BTC"; 
let h1_modified = quickHash(tx1_modified);       // H1 thay đổi
let h12_modified = quickHash(h1_modified + h2);  // H12 thay đổi theo
let merkleRoot_modified = quickHash(h12_modified + h34); // Root cuối cùng thay đổi hoàn toàn

console.log(`TX1 (sửa): ${tx1_modified}`);
console.log(`H1 (cũ):   ${h1}`);
console.log(`H1 (mới):  ${h1_modified}`);
console.log(`H12 (cũ):  ${h12}`);
console.log(`H12 (mới): ${h12_modified}`);
console.log(`Root (cũ): ${merkleRoot}`);
console.log(`Root (mới):${merkleRoot_modified}\n`);

// Nhận xét: Chỉ cần thay đổi 1 bit dữ liệu ở TX1, mã Merkle Root sẽ khác hoàn toàn.