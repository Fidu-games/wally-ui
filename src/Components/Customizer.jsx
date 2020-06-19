import React, { Component } from 'react';

class ColorCube extends Component{
    constructor(props){
        super(props);
        this.change = this.change.bind(this);
    }

    change(){
        document.querySelectorAll('.color-box').forEach(box => {
            box.style.border = 0;
        });

        this.refs.box.style.border = '6px solid grey';

        this.props.onChange(this.props.color);
    }

    render(){
        return(
            <div className={`col-s-4 color-box ${this.props.color}-player`} 
                 onClick={this.change}
                 ref="box"></div>
        );
    }
}

class Customizer extends Component{
    constructor(props){
        super(props);
    }

    createColor(color){
        return <ColorCube color={color} onChange={this.props.onChange}/>
    }

    render(){
        return (
            <div className="colorGird row">
                { this.props.colors.map(color => this.createColor(color)) }
            </div>
        );
    }
}

export default Customizer;