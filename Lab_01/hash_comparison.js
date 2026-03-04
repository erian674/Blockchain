const crypto = require('crypto');

console.log('Lab-01 - Hello World!');

function createHash(algorithm, data){
    return crypto.createHash(algorithm) // Khởi tạo đối tượng hash với thuật toán được chọn
            .update(data)               // Đưa dữ liệu vào để tiến hành tính toán băm
            .digest('hex');             // Xuất kết quả băm ra định dạng chuỗi hex
}

console.log('==== SO SÁNH CÁC THUẬT TOÁN HASH ====');
// Dữ liệu mẫu dùng để thử nghiệm băm
const data = "Blockchain Bitcoin Ethereum";

console.log('Input: '+ data);
console.log('');

// Thực hiện băm dữ liệu "data" bằng 4 thuật toán khác nhau
const hashSHA1 = createHash('sha1', data);     // SHA-1: Thường có độ dài 40 ký tự hex
const hashSHA256 = createHash('sha256', data); // SHA-256: Tiêu chuẩn bảo mật cao, dùng trong Bitcoin (64 ký tự)
const hashSHA512 = createHash('sha512', data); // SHA-512: Độ an toàn cực cao, chuỗi kết quả rất dài (128 ký tự)
const hashMD5 = createHash('md5', data);       // MD5: Thuật toán cũ, tốc độ nhanh nhưng bảo mật kém (32 ký tự)

// In kết quả ra màn hình kèm theo độ dài của từng chuỗi hash thu được
console.log('SHA-1:      ', hashSHA1+` (${hashSHA1.length} ký tự)`);
console.log('SHA-256:    ', hashSHA256+` (${hashSHA256.length} ký tự)`);
console.log('SHA-512:    ', hashSHA512+` (${hashSHA512.length} ký tự)`);
console.log('MD5:        ', hashMD5+` (${hashMD5.length} ký tự)`);

console.log('\nNhận xét:');
console.log('  - Như đẹp gái nhất hệ mặt trời');
console.log('  - Ig: eirian674');
console.log('  - Facebook: quynhnhu2661');
console.log('  - Lớp 22DTH6\n');