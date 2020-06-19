import React, {Component} from 'react';
import config from '../config';
import { Redirect } from 'react-router-dom';

function DataSender(props){
    let { color, room, nickname, uid } = props.data;
    return (
        <Redirect to={{
            pathname: '/gameControl',
            search: `?room=${room}&uid=${uid}&nickname=${nickname}&color=${color}`
        }} />
    );
}

class CodeRegister extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            room: ''
        }
        this.handleCodeSubmit = this.handleCodeSubmit.bind(this);
    }

    async sendCodeToAPI(code){
        try{
            console.log(code);
            let result = await fetch(config.api.url + '/room/exists/' + code);
            if(!result.ok) throw new Error('No se ha podido contactar con el servidor');
            return await result.json();
        }catch(e){
            console.log(e);
        }
    }

    async handleCodeSubmit(e){
        e.preventDefault();
        let code = this.refs.code.value;
        console.log(code);
        if(code == null || code == ''){
            this.refs.debug_zone.innerHTML = "<p>Escribe un código válido</p>";
            return;
        }
        let result = await this.sendCodeToAPI(code);
        console.log(result);
        if(!result || !result.success){
            this.refs.debug_zone.innerHTML = "<p>Escribe un código válido</p>";
            return;
        }
        this.refs.debug_zone.innerHTML = "<p>código valido</p>";
        this.setState({
            room: result.data.roomID
        }, () => {
            this.setState({
                redirect: true
            })
        });
    }

    render(){
        if(this.state.redirect){
            return <DataSender data={{
                room: this.state.room,
                uid: localStorage.getItem('token'),
                nickname: this.props.nickname,
                color: this.props.color
            }}/> 
        }else{
            return(
                <div>
                    <div ref="debug_zone"></div>
                    <form onSubmit={this.handleCodeSubmit}>
                        <div className="form-group">
                            <input type="text" 
                                name="code" 
                                id="code"
                                ref="code"
                                placeholder="room code"
                                className="form-control code-form"
                                maxLength="10"
                                required
                                autoFocus/>
                        </div>
                        <button className="btn btn-primary btn-block btn-lg">ENTRAR</button>
                    </form>
                </div>
            );
        }
    }
}

export default CodeRegister;