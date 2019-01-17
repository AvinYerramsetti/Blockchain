const Block = require('./block');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');
const {cryptoHash} = require('../util/');
const {REWARD_INPUT}= require('../config');
const {MINING_REWARD}= require('../config');

class BlockChain{
    constructor()
    {
        this.chain=[Block.genesis()];
    }

    addBlock({data})
    {
        const newBlock= Block.mineBlock({
            lastBlock: this.chain[this.chain.length-1],
            data
        });
 
        this.chain.push(newBlock);
    }

    replaceChain(chain, validateTransactions, onSuccess)
    {
        if(chain.length<=this.chain.length){
            console.log(JSON.stringify(chain,null,4) + ' vs ' + JSON.stringify(this.chain,null,4))
            console.error('The incoming chain must be longer ');
            return;
        }
        if(!BlockChain.isValidChain(chain)){
            console.error('The incoming chain must be valid');
            return;
        }  

        if(validateTransactions && !this.validTransactionData({chain})){
            console.error('The incoming chain has an invalid transaction data')
            return;
        }
        if(onSuccess) onSuccess(); 
            console.log ('replacing the chain with', chain);

        this.chain= chain;
    }

    validTransactionData({chain}){

        for(let i =1; i<chain.length;i++)
        {
            const block = chain[i];
            const transactionSet = new Set();
            let rewardTransactionCount = 0;

            for(let transaction of block.data)
            {
                if(transaction.input.address === REWARD_INPUT.address)
                {
                    rewardTransactionCount +=1;

                    if(rewardTransactionCount>1)
                    {
                        console.error('Miner rewards Exceed')
                    return false;
                    }
                    if(Object.values(transaction.outputMap)[0]!== MINING_REWARD)
                    {
                    console.error('Miner Reward is inavalid');
                    return false;   
                    }
                }else{
                    if(!Transaction.validTransaction(transaction)){
                        console.error('Invalid Transaction');
                        return false;
                    }

                    const trueBalance= Wallet.calculateBalance({
                        chain: this.chain,
                        address: transaction.input.address
                    });
                    if(transaction.input.amount!==trueBalance){
                        console.error('Invalid input amount');
                        return false;
                    }
                    if(transactionSet.has(transaction))
                    {   
                        console.error('An identical transaction appears more than once in a block')
                        return false;
                    }
                    else{
                        transactionSet.add(transaction);
                    }
                }
            }
        }
        return true;
    }

     static isValidChain(chain){

        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) {
            return false;
        };    

        for(let i=1; i<chain.length; i++)
        {
            const {timestamp, lastHash, hash, nonce, difficulty, data}= chain[i];

            const actualLastHash = chain[i-1].hash;

            const lastDifficulty = chain[i-1].difficulty;

            if(lastHash!== actualLastHash) return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if(hash!==validatedHash) return false;

            if(Math.abs(lastDifficulty-difficulty)>1 ) return false;
        }
       return true;
 }

}
module.exports = BlockChain;