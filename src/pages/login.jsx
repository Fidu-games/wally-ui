import config from '../config';
import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';
import Alert from '../Components/Alert';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            debug_div_active: 'none',
            message: '',
            loading: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount(){
        let token = localStorage.getItem('token');
        if(token && token.length > 0){
            let response = await this.sendLoginData({token: token});
            this.manageRequestData(response);
        }
        this.setState({
            loading: false
        })
    }

    manageRequestData(res){
        if(res != null && res.success){
            localStorage.setItem('token', res.data.token)
            this.setState({debug_div_active: 'redirect'});
            return false;
        }else{
            return res;
        }
    }

    async sendLoginData(data){
        try{
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const credentials = {
                method: 'POST',
                headers: headers,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            };

            const request = new Request(`${config.api.url}/user/login`, credentials);

            const res = await fetch(request);

            if(res.ok){
                return await res.json();
            }else{
                return null;
            }
        }catch(e){
            return e;
        }
    }

    async handleSubmit(e){
        e.preventDefault();

        this.setState({
            debug_div_active: 'loading',
            message: ''
        });

        let token = localStorage.getItem('token');

        const data = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };

        if(token) Object.assign(data, {token: token});

        const response = await this.sendLoginData(data);
        const element = this.manageRequestData(response);

        if(element){
            this.refs.email.value = null;
            this.refs.password.value = null;
    
            this.setState({
                debug_div_active: 'error',
                message: element.messages || element.errors
            });
    
            setTimeout(() => {
                this.setState({
                    debug_div_active: '',
                    message: ''
                })
            }, 4000);
        }
    }

    render(){
        if(this.state.loading){
            return (
                <p>Loading...</p>
            )
        }else{
            return(
                <DefaultLayout title='login' links={[
                    {'rel': 'stylesheet', 'href': '/stylesheets/login.css'}
                ]}>
                    <section className="margen">
                        <div id="form-login" className='p-5'>
                            <form className="form" onSubmit={this.handleSubmit}>
                                <h4 className='mr-wallace-font text-center mt-4 mb-5'>Mr Wallace</h4>
                                <div ref='debug_div'>
                                    <Alert elementDisplay={this.state.debug_div_active} message={this.state.message} redirect='/player'/>
                                </div>
                                <div className='form-group'>
                                    <label  htmlFor='email'>Correo electrónico</label>
                                    <input type='email' 
                                        className="form-control"
                                        id='email'
                                        name='email' 
                                        ref='email'
                                        maxLength='100' 
                                        placeholder='Introduce tu correo electrónico'
                                        required/>
                                </div>
                                <div className='form-group'>
                                    <label  htmlFor='password'>contraseña</label>
                                    <input type='password' 
                                        className="form-control" 
                                        id='password' 
                                        name='password'
                                        ref='password'
                                        maxLength='100' 
                                        placeholder='Introduce tu contraseña' 
                                        required/>
                                </div>
                                <button type='submit' className='btn btn-primary btn-block my-4'>entrar</button>
                            </form>
                        </div>
                    </section>
                </DefaultLayout>
            );
        }
    }
}

export default Login;
