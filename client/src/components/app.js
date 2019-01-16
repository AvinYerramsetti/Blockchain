import React, {Component} from 'react';

import Blocks from './Blocks'

class App extends Component{
    state = {
        walletInfo:{
            address:'foox16',
            balance:9999
        }
    };
render() {
    const {address,balance} = this.state.walletInfo;
        return (
            <div>
                <div>Welcome to the blockchain</div>
                <div>address : {address}</div>
                <div>balance: {balance}</div>
        </div>
        );
    }
}
export default App;
