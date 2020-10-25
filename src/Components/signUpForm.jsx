import React, { useState } from 'react'
import DefaultLayout from '../layouts/default'

export default function SignUpForm (props) {
  const [nickNameMessage, setNicknameMessage] = useState()
  const [emailMessage, setEmailMessage] = useState()
  const [password, setPassword] = useState('')
  const [repitedPassword, setRepitedPassword] = useState('')
  const [passState, setPassState] = useState({ color: 'secondary', message: '' })
  const valid = { nickname: false, email: false, password: false }
  const [error, setError] = useState('')

  const validateNickname = (e) => {
    const nickname = e.target.value
    if (nickname.length < 0 || nickname.length > 15) {
      setNicknameMessage('El nickname debe tener una longitud igual o mayor a 3 caracteres')
      valid.nickname = false
      return
    }
    setNicknameMessage('El nickname es correcto')
    valid.nickname = true
    props.onChange(e)
  }

  const validateEmail = (e) => {
    const email = e.target.value
    if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setEmailMessage('La estructura del email es invalida, debe contener un @ y un dominio')
      valid.email = false
      return
    }
    setEmailMessage('Email correcto')
    valid.nickname = true
    props.onChange(e)
  }

  const verifyPasswordEquality = (e) => {
    const evaluatedPassword = e.target
    if (evaluatedPassword.name === 'password') {
      setPassword(evaluatedPassword.value)
      if (evaluatedPassword.value !== repitedPassword) {
        setPassState({
          message: 'Las contraseñas no coinciden',
          color: 'warning'
        })
        valid.password = false
        return
      }
    } else {
      setRepitedPassword(evaluatedPassword.value)
      if (evaluatedPassword.value !== password) {
        setPassState({
          message: 'Las contraseñas no coinciden',
          color: 'warning'
        })
        valid.password = false
        return
      }
    }
    setPassState({
      message: 'Las contraseñas coinciden',
      color: 'success'
    })
    valid.password = true
    props.onChange({ target: { name: 'password', value: password } })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const keys = Object.keys(valid)
    for (const i of keys) {
      if (!valid[i]) {
        setError(`El ${i} es incorrecto, revisalo y vuelve a intentar`)
        return
      }
    }
    props.onSubmit(e)
  }

  return (
    <DefaultLayout>
      <div className='row m-0' id='content'>
        <div className='col-lg-12 p-0'>
          <form className='form p-5' id='sign-up-form' onSubmit={handleSubmit}>
            <div className='col d-flex justify-content-center align-items-center'>
              <h1 className='mb-2'>Registro</h1>
            </div>
            <div>{props.error || error}</div>
            <div className='col-lg-12 d-flex justify-content-center align-items-center'>
              <div id='formFields' className='mt-0'>
                <div className='form-group mt-5'>
                  <label htmlFor='name'>Nombre completo</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control'
                    placeholder='Introduce tu nombre completo'
                    maxLength='100'
                    onChange={props.onChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='nickname'>Nickname</label>
                  <input
                    type='text'
                    name='nickname'
                    id='nickname'
                    className='form-control'
                    placeholder='Introduce un nombre loco'
                    maxLength='15'
                    onChange={validateNickname}
                    required
                  />
                  {nickNameMessage}
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Correo electrónico</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='form-control'
                    placeholder='Introduce tu email'
                    maxLength='100'
                    onChange={validateEmail}
                    required
                  />
                  {emailMessage}
                </div>
                <div className='form-group mt-5'>
                  <label htmlFor='password'>Contraseña</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='form-control'
                    placeholder='Introduce tu contraseña'
                    maxLength='100'
                    value={password}
                    onChange={verifyPasswordEquality}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password-re'>Repite tu contraseña</label>
                  <input
                    type='password'
                    name='password-re'
                    id='password-re'
                    className='form-control'
                    placeholder='Repite tu contraseña'
                    maxLength='100'
                    value={repitedPassword}
                    onChange={verifyPasswordEquality}
                    required
                  />
                  <span className={`px-3 my-4 text-${passState?.color}`}>{passState?.message}</span>
                </div>
                <button type='submit' className='btn btn-primary btn-block mt-5' disabled={props.loading}>
                  registrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  )
}
