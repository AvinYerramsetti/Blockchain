import React, {Component} from 'react';
import Block from './block'

class Blocks extends Component {
    state = {blocks : []};
    // state = {
    //     blocks: [
    //         // {hash: 'hash-one'},
    //         // {hash: 'hash-two'},
    //         // {hash: 'hash-three'}
    //     ]
    // };

    componentDidMount() {
        fetch('https://www.localhost:3000/api/blocks') //TODO Verify this call
            .then(response => response.json())
            .then(json => this.setState({blocks: json}))
    }

    render() {
        return (<div>
            <h3> Blocks </h3>{
            this.state.blocks.map(block => {
                return (
                    //<div className={'Block'} key={block.hash}> {block.hash} </div>
                    <Block key={block.hash} block={block}/>
                )
            })}
        </div>)
    }
}

export default Blocks;
