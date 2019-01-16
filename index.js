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
const pubsub = new PubSub({blockchain});


const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;


app.use(bodyParser.json());
app.use(express.static(path.join((__dirname,'client/dist'))));

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
    const transaction = wallet.createTransaction({recipient, amount});

    transactionPool.setTransaction(transaction);

    console.log('transactionPool', transactionPool);

    res.json({transaction});
});

//send response to the static file
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'client/dist/index.html'));
});

//const PORT = 3000;
app.listen(PORT,()=>
    console.log (`listening at localhost: ${PORT}`));
