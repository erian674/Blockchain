const crypto = require('crypto');

console.log('Lab-01 - Hello World!');

function createHash(algorithm, data){
    return crypto.createHash(algorithm)
            .update(data)
            .digest('hex');
}

console.log('==== SO SÁNH CÁC THUẬT TOÁN HASH ====');
const data = "Blockchain Bitcoin Ethereum";

console.log('Input: '+ data);
console.log('');

const hashSHA1 = createHash('sha1', data);
const hashSHA256 = createHash('sha256', data);
const hashSHA512 = createHash('sha512', data);
const hashMD5 = createHash('md5', data);

console.log('SHA-1:     ', hashSHA1+` (${hashSHA1.length} ký tự)`);
console.log('SHA-256:     ', hashSHA256+` (${hashSHA256.length} ký tự)`);
console.log('SHA-512:     ', hashSHA512+` (${hashSHA512.length} ký tự)`);
console.log('MD5:     ', hashSHA1+` (${hashMD5.length} ký tự)`);

console.log('\nNhận xét:');
console.log('  - Như đẹp gái nhất hệ mặt trời');
console.log('  - Ig: eirian674');
console.log('  - Facebook: quynhnhu2661');
console.log('  - Lớp 22DTH6\n');