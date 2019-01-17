

class TransactionMiner{
    constructor({blockchain, transactionPool, wallet, pubsub }){
        this.blockchain= blockchain;
        this.transactionPool= transactionPool;
        this.wallet = wallet;
        this.pubsub = pubsub;

    }

    mineTransactions(){
        //get the valid transaction from transaction pool
        

        //generate the miners reward
        //add a block consisting of these transactions to the blockchain
        // broadcast the updated block chain
        //clear the pool
    }
}

module.exports = TransactionMiner;