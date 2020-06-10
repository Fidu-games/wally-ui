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
            key: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    manageRequestData(data){
        if(data.success){
            console.log(data.key);
            this.setState({
                debug_div_active: 'redirect',
                key: data.key
            });
            return false;
        }else{
            return data;
        }
    }

    async sendLoginData(data){
        try{
            const headers = new Headers();

            headers.append('Content-Type', 'application/json');

            const credentials = {
                method: 'post',
                headers: headers,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            };

            const request = new Request(`${config.api.url}/login`, credentials);

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

        const data = {
            nickname: this.refs.nickname.value,
            password: this.refs.password.value
        };

        console.log(data);
        const response = await this.sendLoginData(data);
        const element = this.manageRequestData(response);

        if(element){
            this.refs.nickname.value = null;
            this.refs.password.value = null;
    
            this.setState({
                debug_div_active: 'error',
                message: element.message
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
        return(
            <DefaultLayout title='login' links={[
                {'rel': 'stylesheet', 'href': '/stylesheets/login.css'}
            ]}>
                <section className="margen">
                    <div id="form-login" className='p-5'>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <h4 className='mr-wallace-font text-center mt-4 mb-5'>Mr Wallace</h4>
                            <div ref='debug_div'>
                                <Alert elementDisplay={this.state.debug_div_active} message={this.state.message} redirect='/game' playerKey={this.state.key} />
                            </div>
                            <div className='form-group'>
                                <label  htmlFor='nickname'>nickname</label>
                                <input type='text' 
                                       className="form-control"
                                       id='nickname'
                                       name='nickname' 
                                       ref='nickname'
                                       maxLength='100' 
                                       placeholder='Introduce tu nickname'
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

export default Login;
