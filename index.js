const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');
const TransactionPool= require('./wallet/transaction-pool');
const Wallet = require('./wallet');



const path = require('path');
const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubsub = new PubSub({blockchain, transactionPool, wallet});

setTimeout(()=>pubsub.broadcastChain(),1000);


const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;


app.use(bodyParser.json());
//app.use(express.static(path.join((__dirname,'client/dist'))));

app.get('/api/blocks', (req, res)=>{
    res.json(blockchain.chain);
});

app.post('/api/mine', (req,res)=>{
    const {data }= req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();

    res.redirect('api/blocks');
});

app.post('/api/transact',(req, res)=>{

    const {amount, recipient} = req.body;

    let transaction = transactionPool.existingTransaction({inputAddress: wallet.publicKey});

   try  {
    if(transaction){
        transaction.update({senderWallet: wallet, recipient, amount});

    }else{
         transaction = wallet.createTransaction({recipient, amount});
    }
        } 
   catch(error)
    {
       return res.status(400).json({type:'error', message:error.message});
   }

    transactionPool.setTransaction(transaction);

    console.log('transactionPool', transactionPool);

    pubsub.broadcastTransaction(transaction);

    res.json({type:'sucess', transaction});
});

app.get('/api/transaction-pool-map',(req, res)=>{
    res.json(transactionPool.transactionMap);
});

//send response to the static file
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'client/dist/index.html'));
});

//const DEFAULT_PORT = 3000;
let PEER_PORT;

if(process.env.GENERATE_PEER_PORT ==='true'){
    PEER_PORT = DEFAULT_PORT +Math.ceil(Math.random()*1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>
    console.log (`listening at localhost: ${PORT}`));
