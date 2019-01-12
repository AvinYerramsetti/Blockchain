const Block =require('./block');
const cryptoHash = require('./crypto-hash');
const {GENESIS_DATA}= require ('./config');

describe('Block',()=>
{
    const timestamp= 'a-date' ;
    const lastHash='foo-hash';
    const hash= 'bar- hash';
    const data= ['blockchain','data'];
    const block= new Block({timestamp, lastHash, hash, data});

    it('it has a timestamp, hash, lastHash, and data property', ()=>
    {expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.data).toEqual(data);
    });

    describe('genesis',()=>{
        const genesisBlock= Block.genesis(); 
        console.log('genesisBlock', genesisBlock);
        it('returns a block instance',()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        });
        
        it ('returns the genesis data', ()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });

    describe('mineBlock',()=>
    {
        const lastBlock= Block.genesis();
        const  data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock, data}); 

        it('returns a block instance',()=>{
            expect (minedBlock instanceof Block).toBe(true);
        });

        it ('sets the `lastHash` to be the `hash` of the lastblock',()=> {
            expect (minedBlock.lastHash).toEqual(lastBlock.hash);    
        });

        it('sets the data', ()=>{
            expect (minedBlock.data).toEqual(data);
        });

        it ('sets the timeStamp',()=>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates SHA-256 based on Proper inputs', () =>
        {
           expect(minedBlock.hash)
           .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data)); 
        });
    });
});