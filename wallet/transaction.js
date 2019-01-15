const uuid = require('uuid/v1');
const {verifySignature} = require('../util');

class Transaction{
     constructor({senderWallet, recipient, amount}){
        this.id= uuid;
        this.outputMap = {};
        this.outputMap = this.createOutputMap({senderWallet, recipient, amount});
        this.input = this.createInput({senderWallet, outputMap: this.outputMap});


     }

     createOutputMap({senderWallet, recipient, amount}){

        const outputMap = {};
        outMap[recipient]= amount;
        outMap[senderWallet.publicKey] = senderWallet.balance- amount;

        return outputMap;

     }

     createInput({senderWallet, outputMap }){
         return{
             timestamp: Date.now(),
             amount: senderWallet.balance,
             address: senderWallet.publicKey,
             signature: senderWallet.sign(outputMap)
         };
     }

     static validTransaction(transaction){
         const {input:{address, amount, signature}, outputMap} = transaction;

        const outputTotal = Object.values(outputMap)
        .reduce((total, outputAmount) => total+outputAmount);
      
        if(amount!= outputAmount){
            console.error(`Invalid transaction from ${address}`);
            return false;
        }

        if(!verifySignature({publicKey: address, data: outputMap, signature })){
            console.error(`Invalid signature ${address}`);
            return false;
        }

        return true;

        
     }
}

module.exports = Transaction;