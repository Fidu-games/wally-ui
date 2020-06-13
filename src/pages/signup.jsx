import config from '../config';
import React, { Component } from 'react';
import DefaultLayout from '../layouts/default';
import Alert from '../Components/Alert';

class SignUp extends Component{

    constructor(props){
        super(props);

        this.links = [];
        
        this.verifyPasswordEquality = this.verifyPasswordEquality.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.verifyNickname = this.verifyNickname.bind(this);
        this.validateEmail = this.validateEmail.bind(this);

        this.state = {
            pass_alert: '',
            pass_alert_color: 'secondary',
            nicknameValidityCheck: '',
            button_disabled: false,
            alert_state: 'none',
            message: '',
            messageEmailError: '',
            nicknameValidity: false,
            passwordValidity: false,
            emailValidity: false
        };
    }

    verifyPasswordEquality(){
        let password_state = false;
        if(this.refs.password.value === this.refs.password_repeated.value){
            this.setState({
                pass_alert: 'Las contraseñas coinciden',
                pass_alert_color: 'success'
            });
            this.changeInputState(this.refs.password, true);
            this.changeInputState(this.refs.password_repeated, true);
            password_state = true;
        }else{
            this.setState({
                pass_alert: 'Las contraseñas no coinciden',
                pass_alert_color: 'warning'
            });
            this.changeInputState(this.refs.password_repeated, false);
            password_state = false;
        }
        this.setState({passwordValidity: password_state});
    }

    changeInputState(inputObject, state){
        if(state){
            if(typeof state == 'string'){
                inputObject.classList.remove('is-valid');
                inputObject.classList.remove('is-invalid');
            }else{
                inputObject.classList.add('is-valid');
                inputObject.classList.remove('is-invalid');
            }
        }else{
            inputObject.classList.add('is-invalid');
            inputObject.classList.remove('is-valid');
        }
    }

    async validateEmail(){
        const emailBox = this.refs.email;
        const email = emailBox.value;
        let message = '';

        if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email))){
            this.changeInputState(emailBox, false);
            this.setState({ emailValidity: false })
            message = 'La estructura del email es invalida, debe contener un @ y un dominio';
        }else{
            this.changeInputState(emailBox, true);
            this.setState({ emailValidity: true })
            message = 'Email correcto';
        }

        this.setState({
            messageEmailError: message
        });
    }

    async verifyNickname(){
        const nickname = this.refs.nickname.value;
        let message = '';

        if(nickname.length === 0){
            this.changeInputState(this.refs.nickname, 'none');
            message = '';
        }else{
            if(nickname.length < 3){
                this.changeInputState(this.refs.nickname, false);
                this.setState({nicknameValidity: false});
                message = 'El nickname debe tener una longitud igual o mayor a 3 caracteres';
            }else{
                if(nickname.length > 15){
                    this.changeInputState(this.refs.nickname, false);
                    this.setState({nicknameValidity: false});
                    message = `El nickname debe tener una longitud menor a 16 caracteres. (Longitud actual ${nickname.length})`;
                }else{
                    this.changeInputState(this.refs.nickname, true);
                    this.setState({nicknameValidity: true});
                    message = 'El nickname es correcto';
                }
            }
        }

        this.setState({
            nicknameValidityCheck: message
        });
    }

    async sendFormData(data){
        try{
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            const credentials = {
                method: 'post',
                cache: 'default',
                headers: headers,
                mode: 'cors',
                body: JSON.stringify(data)
            };

            const request = await fetch(`${config.api.url}/user/sign_up`, credentials);

            if(request.ok){
                return await request.json();
            }

            throw new Error('Ha ocurrido un error durante el registro del usuario');

        }catch(e){
            console.log(e);
        }
    }

    handleResponse(res){
        console.log(res);

        if(res == null || !res.success){
            this.setState({
                button_disabled: false,
                alert_state: 'error',
                message: res.messages || res.errors
            })
        }else{
            localStorage.setItem('token', res.data.token);

            this.setState({
                button_disabled: false,
                alert_state: 'redirect'
            })
        }
    }

    async handleSignUp(e){

        e.preventDefault();

        if(this.state.emailValidity && this.state.nicknameValidity && this.state.nicknameValidity){
            this.setState({
                button_disabled: true,
                alert_state:'loading'
            })
    
            const refs = this.refs;
    
            const userData = {
                name: refs.name.value,
                password: refs.password.value,
                nickname: refs.nickname.value,
                email: refs.email.value
            }
    
            const response = await this.sendFormData(userData);
            this.handleResponse(response);
        }else{
            alert("Llene correctamente todos los campos antes de continuar.");
        }
    }

    render(){
        return (
            <DefaultLayout title='signup' links={[
                {'rel': 'stylesheet', 'href': '/stylesheets/signup.css'}
            ]}>
                <div className="row pt-2 m-0" id='content'>
                    <div className="col-lg-12 p-0">
                        <form className='form p-5 bg-light' id='sign-up-form' onSubmit={this.handleSignUp}>
                            <div className='col d-flex justify-content-center align-items-center'>
                                <h1 className='mb-2'>Registro</h1>
                            </div>
                            <hr/>
                            <div>{ this.state.debug_area }</div>
                            <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                                <div id="formFields" className="mt-0">
                                    <div className='form-group mt-5'>
                                        <label htmlFor='name'>Nombre completo</label>
                                        <input type='text'
                                               name='name'
                                               id='name'
                                               className='form-control'
                                               placeholder='Introduce tu nombre completo'
                                               maxLength='100'
                                               ref='name'
                                               required/>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='nickname'>Nickname</label>
                                        <input type='text'
                                               name='nickname'
                                               id='nickname'
                                               className='form-control'
                                               placeholder='Introduce un nombre loco'
                                               maxLength='15'
                                               ref='nickname'
                                               onChange={this.verifyNickname}
                                               required/>
                                        { this.state.nicknameValidityCheck }
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Correo electrónico</label>
                                        <input type='email'
                                               name='email'
                                               id='email'
                                               className='form-control'
                                               placeholder='Introduce tu email'
                                               maxLength='100'
                                               ref='email'
                                               onChange={this.validateEmail}
                                               required/>
                                        { this.state.messageEmailError }
                                    </div>
                                    <div className='form-group mt-5'>
                                        <label htmlFor='password'>Contraseña</label>
                                        <input type='password'
                                               name='password'
                                               id='password'
                                               className='form-control'
                                               placeholder='Introduce tu contraseña'
                                               maxLength='100'
                                               ref='password'
                                               onChange={this.verifyPasswordEquality}
                                               required/>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password-re'>Repite tu contraseña</label>
                                        <input type='password'
                                               name='password-re'
                                               id='password-re'
                                               className='form-control'
                                               placeholder='Repite tu contraseña'
                                               maxLength='100' ref='password_repeated'
                                               onChange={this.verifyPasswordEquality}
                                               required />
                                        <span className={`px-3 my-4 text-${this.state.pass_alert_color}`}>{ this.state.pass_alert }</span>
                                    </div>
                                    <div>
                                        <Alert elementDisplay={this.state.alert_state} message={this.state.message} redirect='/player' />
                                    </div>
                                    <button type='submit'  className='btn btn-primary btn-block mt-5' disabled={ this.state.button_disabled }>
                                        registrar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <div className="col-lg-6 p-2"  id='planet'>
                        <img src='/images/planeta1.png'  width='100%'  className='img-fluid px-5 py-2' alt='planet'/>
                    </div>  */}
                </div>
            </DefaultLayout>
        );
    }
}

export default SignUp;
