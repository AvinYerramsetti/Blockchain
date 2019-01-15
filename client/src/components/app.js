import React, {Component} from 'react';

class App extends Component{
    state = {
        walletInfo:{
            address:'foox16',
            balance:9999
        }
    };
render() {
    const {address,balance} = this.state.walletInfo;
        return (<div>
                <div> welcome to the blockchain</div>
                <div>address : {address}</div>
                <div>balance: {balance}</div>
        </div>
        );
    }
}
export default App;
