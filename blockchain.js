const Block = require('./block');
const cryptoHash = require('./crypto-hash');

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

     static isValidChain(chain){

        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) {
            return false;
        };    

        // // for(let i=1; i<chain.length; i++)
        // // {
        // //     const {timeStamp, lastHash, hash, data}= chain[i];

        // //     const actualLastHash = chain[i-1].hash;

            

        // //     if(lastHash!== actualLastHash) return false;


        // //     const validatedHash = cryptoHash(timeStamp, lastHash, data);


        // //     if(hash!==validatedHash) return false;
        // }
       return true;
 }

}
module.exports = BlockChain;