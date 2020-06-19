import React, {Component} from 'react';

class Player extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(['blue', 'red', 'green'].some(c => c == this.props.color)){
            return(
                <div className="player">
                    <div className="player-nickname">
                        <h2>{this.props.nickname}</h2>
                    </div>
                    <div className="player-sprite-container">
                        <img className="player-sprite" src={`/images/wallace_${this.props.color}.png`}/>
                    </div>
                </div>
            );
        }else{
            console.log('Incorrect color');
            return <span></span>;
        }
    }
}

export default Player;