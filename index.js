const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const path = require('path');
const app = express();
const blockchain = new Blockchain;

app.use(bodyParser.json());

app.get('/api/blocks', (req, res)=>{
    res.json(blockchain.chain);
});

app.post('/api/mine', (req,res)=>{
    const {data }= req.body;
    blockchain.addBlock({data});

    res.redirect('api/blocks');
});

//for the docuemnt
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'./client/index.html'));
});

const PORT = 3000;
app.listen(PORT,()=>
    console.log (`listening at localhost: ${PORT}`));
