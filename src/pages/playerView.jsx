import React, { Component } from 'react';
import Alert from '../Components/Alert';
import config from '../config';
import GameLayout from '../layouts/game';

class PlayerView extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            loading_state: 'Loading...',
            alert_state: '',
            redirect: '/login'
        }

        this.playerData = {};
        this.closeSession = this.closeSession.bind(this);
    }

    async getUserData(token){
        try{
            let result = await fetch(`${config.api.url}/user/${token}`);
            if(result.ok){
                return await result.json();
            }
            throw new Error('No pudimos contactar con el servidor');
        }catch(e){
            console.log(e);
        }
    }

    async deleteToken(token){
        try{
            let result = await fetch(`${config.api.url}/user/session`, {
                method: 'DELETE',
                headers:{ 'Content-Type': 'application/json' },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify({ token: token })
            });
            
            if(result.ok){
                return await result.json();
            }

            throw new Error('No se ha podido contactar con el servidor');
        }catch(e){
            console.log(e);
        }
    }

    refuse(redirect = '/login'){
        localStorage.removeItem('token');
        this.setState({
            redirect: redirect,
            loading: false,
            alert_state: 'redirect'
        });
    }

    async componentWillMount(){
        this.setState({ loading_state: 'Verifying player data...'});
        let token = localStorage.getItem('token');
        if(token == null || token == undefined || !(token.length > 0)) {
            this.refuse(); 
            return
        }
        let result = await this.getUserData(token);
        if(result && result.success){
            this.setState({ loading_state: 'Loading assets...'});
            this.playerData = result.data.player;
            this.setState({ loading: false });
        }else{
            this.refuse();
        }
    }

    async closeSession(){
        this.setState({
            loading: true,
            loading_state: 'Closing session...'
        })
        let token = localStorage.getItem('token');
        let close = await this.deleteToken(token);
        if(close != null && close.success){
            localStorage.removeItem('token');
            this.refuse('/');
        }else{
            console.log(close);
        }
    }

    render(){
        if(this.state.loading){
            return (
                <p>{ this.state.loading_state }</p>
            );
        }else if(this.state.alert_state == 'redirect'){
            return (
                <Alert elementDisplay={this.state.alert_state} redirect={this.state.redirect}/>
            );
        }else{
            return(
                <GameLayout title='profile'>
                    <p>name: { this.playerData.name }</p>
                    <p>nickname: { this.playerData.nickname }</p>
                    <p>email: { this.playerData.email }</p>
                    <p>password: { this.playerData.password }</p>
                    <p>date: { this.playerData.date }</p>
                    <button className="btn btn-danger my-2 my-sm-0" onClick={this.closeSession}>Log out</button>
                </GameLayout>
            );
        }
    }
}

export default PlayerView;