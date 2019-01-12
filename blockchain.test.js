const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', ()=>{
    let blockchain, newChain, originalChain, postiveBlockChain;

    beforeEach(()=>{
        blockchain = new Blockchain(); 
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    });

    it ('contains a `chain` Array of instance' , ()=>
    {
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    
    it ('starts with a genesis block', ()=>
    {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to chain',() =>
    
    {
        const newData = 'foo bar';
        blockchain.addBlock({data:newData});

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    
    });

    describe ('isValidChain',()=> 
    {
        describe('the chain does not start with the genesis block',()=>{
            it('returns false', ()=>{
                blockchain.chain[0]= {data: 'fake-genesis'};
                expect (Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });

        });

        describe('the chain starts with the genesis block and has multiple blocks', ()=>
        {

            beforeEach(()=> {
                blockchain.addBlock({data:'Bears'});
                blockchain.addBlock({data:'Colts'});
                blockchain.addBlock({data:'CowBoys'});
            });
            describe('and a lastHash reference has changed',()=>{
                it('returns false', ()=>{
                   
                    blockchain.chain[2].lastHash='broken-lastHash';
                    expect (Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
            });
             describe ('and the chain contains a block with an invalid field',()=>{
                 it('returns false', ()=>{
               
                blockchain.chain[2].data='some-Bad-Evil data';
                expect (Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });    
            });

            describe('and the chain does not contain any invalid blocks',()=>{
                it('returns true', ()=>{
                   // debugger;
                console.log(JSON.stringify(blockchain,null,4))
                expect (Blockchain.isValidChain(blockchain.chain)).toBe(true);
                 
            });  
            }); 
        });
    });

    describe ('replaceChain()', ()=>{
        describe('when the new chain is longer',()=>{
            it('doesnot replace the chain',()=> {

                newChain.chain[1]={new:'chain'};
                blockchain.replaceChain(newChain.chain);

                expect(blockchain.chain).toEqual(originalChain);
            });
        });
        describe('when the new chain is longer', ()=>{
            beforeEach(()=> {
                newChain.addBlock({data:'Bears'});
                newChain.addBlock({data:'Colts'});
                newChain.addBlock({data:'CowBoys'});
            });
            describe('and the chain is invalid',()=>{
                it('doesnot replace the chain',()=> {
                    newChain.chain[2].hash ='some-fake-hash';
                    blockchain.replaceChain(newChain.chain);

                expect(blockchain.chain).toEqual(originalChain);

                });

            });
            describe ('and  the chain is valid',()=>{
                it('replaces the chain',()=> {
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(newChain.chain);
                });

            });
        })
    });

});