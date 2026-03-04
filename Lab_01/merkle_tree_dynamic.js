const crypto = require('crypto');

function hash(data){
    return crypto.createHash('sha256')
        .update(data)
        .digest('hex');
}

console.log("=== THỰC HÀNH: MERKLE TREE DYNAMIC===\n");

function buildMerkleTree(transactions){
    console.log(`\n${'='.repeat(50)}\n`);
    console.log(`MEKLE TREE WITH ${transactions.length} TRANSACTIONS`); 
    console.log(`\n${'='.repeat(50)}\n`);

    let level = 0;
    let currentLevel = transactions.map((tx, idx)=>{
        const h = hash(tx);
        console.log(`[Level ${level}] TX${idx+1}: ${tx} ---> ${h} `)
        return h;
    });

    while(currentLevel.length>1){
        level++;
        let nextLevel = [];
        for (let i =0; i<currentLevel.length; i+=2){
            let left = currentLevel[i];
            // Logic xử lý số lẻ: nếu không có right thì lấy left làm right (nhân đôi node cuối)
            let right = (i+1<currentLevel.length)?currentLevel[i+1]: left; 
            let parent = hash(left+right);

            console.log(`[Level ${level}] ${left} + ${right}`);
            console.log(`              ->${parent}\n`);

            nextLevel.push(parent);
        }
        currentLevel = nextLevel;
    }

    console.log(`MERKLE ROOT: ${currentLevel[0]}\n`);
    return currentLevel[0];
}

// Test với số lượng transaction khác nhau
const tx_2 = [
    "TX1: Nhu -> A: 10",
    "TX2: B -> C: 5"
];

const tx_4 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3"
];

const tx_5 = [
    "TX1: Alice->Bob 10",
    "TX2: Charlie->David 5",
    "TX3: Eve->Frank 8",
    "TX4: Grace->Henry 3",
    "TX5: Grace->Henry 100"
];

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

buildMerkleTree(tx_2);
buildMerkleTree(tx_4);
buildMerkleTree(tx_5);
buildMerkleTree(tx_8);