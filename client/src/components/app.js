import React, {Component} from 'react';
import logo from '../assets/logo.png';
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
            <div className={'App'}>
                <img className={'logo'} src={logo}></img>
                <div>Welcome to the blockchain</div>
                <div className={'WalletInfo'}>
                <div>address : {address}</div>
                <div>balance: {balance}</div>
                </div>
                <br/>
                <Blocks/>
        </div>
        );
    }
}
export default App;
