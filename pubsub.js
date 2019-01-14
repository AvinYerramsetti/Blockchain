const PubNub = require('pubnub');

const credentials = {
    publishKey : 'pub-c-c686b154-6f3b-45b5-af15-19a5a982688c',
    subscribeKey: 'sub-c-944d95e2-181b-11e9-923b-9ef472141036',
    secretKey: 'sec-c-Y2FiMmU1NmQtYjQ3Yy00NjU3LWI4YWQtZTQ1ZDJhZWI0MzRl',
};

const CHANNELS = {
    TEST: 'Test'

};

class PubSub{
    construct(){
        
        this.pubNub = new PubNub(credentials);
        this.pubnub.subscribe({channels:Object.values(CHANNELS)});
        this.pubnub.addListener((this.listener()));
        
    }
    listener() {
        return{
            message:messageObject=>{
                const {channel, message} = messageObject;
                console.log(`Message received.Channel:${channel}. Message: ${message}`);
            }
        };

    }
    publish({ channel, message}){
        //console.log("here"+ this.pubnub);
        this.pubnub.publish({channel,message});
    }
}

const testPubSub = new PubSub();
testPubSub.publish({channel: CHANNELS.TEST, message:'Hello World'});

module.exports = PubSub;
    

