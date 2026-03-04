const crypto = require('crypto');

// Hàm băm SHA-256 cơ bản để mã hóa dữ liệu đầu vào
function hash(data){
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex');
}

console.log("=== THỰC HÀNH: MERKLE TREE DYNAMIC ===\n");

/**
 * Hàm xây dựng cây Merkle từ một danh sách giao dịch (transactions)
 * Cơ chế: Gom nhóm 2 node con băm lại thành 1 node cha, lặp lại cho đến khi còn 1 Root duy nhất.
 */
function buildMerkleTree(transactions){
    console.log(`\n${'='.repeat(50)}\n`);
    console.log(`MERKLE TREE WITH ${transactions.length} TRANSACTIONS`); 
    console.log(`\n${'='.repeat(50)}\n`);

    let level = 0; // Biến đếm tầng của cây (bắt đầu từ tầng lá)

    // Bước 1: Băm tất cả các giao dịch ban đầu (Level 0 - Leaf Nodes)
    let currentLevel = transactions.map((tx, idx)=>{
        const h = hash(tx);
        console.log(`[Level ${level}] TX${idx+1}: ${tx} ---> ${h} `)
        return h;
    });

    // Bước 2: Lặp lại quá trình gom nhóm cho đến khi chỉ còn lại 1 mã băm duy nhất (Merkle Root)
    while(currentLevel.length > 1){
        level++;
        let nextLevel = []; // Mảng chứa các mã băm ở tầng cao hơn

        // Duyệt qua mảng hiện tại, lấy từng cặp 2 node (i và i+1)
        for (let i = 0; i < currentLevel.length; i += 2){
            let left = currentLevel[i];
            
            // LOGIC XỬ LÝ SỐ LẺ: 
            // Nếu một tầng có số lượng node lẻ, node cuối cùng không có cặp sẽ tự băm với chính nó (nhân đôi)
            let right = (i + 1 < currentLevel.length) ? currentLevel[i+1] : left; 
            
            // Băm kết hợp: Hash(Node Trái + Node Phải) = Node Cha
            let parent = hash(left + right);

            console.log(`[Level ${level}] ${left} + ${right}`);
            console.log(`              ->${parent}\n`);

            nextLevel.push(parent);
        }
        // Sau khi duyệt xong 1 tầng, cập nhật danh sách node mới để tiếp tục băm lên tầng trên
        currentLevel = nextLevel;
    }

    // Kết quả cuối cùng là Merkle Root - Mã định danh duy nhất cho toàn bộ danh sách giao dịch
    console.log(`MERKLE ROOT: ${currentLevel[0]}\n`);
    return currentLevel[0];
}

// THỬ NGHIỆM VỚI CÁC TRƯỜNG HỢP KHÁC NHAU:

// 1. Trường hợp 2 giao dịch (Cây cân bằng đơn giản)
const tx_2 = [
    "TX1: Nhu -> A: 10",
    "TX2: B -> C: 5"
];

// 2. Trường hợp 4 giao dịch (Cây cân bằng 3 tầng)
const tx_4 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3"
];

// 3. Trường hợp 5 giao dịch (SỐ LẺ - Kiểm tra logic nhân đôi node cuối)
const tx_5 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3",
    "TX5: Grace->Henry 100"
];

// 4. Trường hợp 8 giao dịch (Cây lớn)
const tx_8 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3",
    "TX5: Ivy->Jack 2",
    "TX6: Kelly->Leo 7",
    "TX7: Mike->Nancy 4",
    "TX8: Oscar->Pam 6"
];

// Chạy hàm dựng cây cho từng bộ dữ liệu
buildMerkleTree(tx_2);
buildMerkleTree(tx_4);
buildMerkleTree(tx_5);
buildMerkleTree(tx_8);