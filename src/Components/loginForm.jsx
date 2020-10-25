import React, { useState } from 'react'
import DefaultLayout from '../layouts/default'

export default function LoginForm (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    props.onSubmit(email, password)
    setPassword('')
  }
  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  return (
    <DefaultLayout>
      <section className='margen'>
        <div id='form-login'>
          <form className='form' onSubmit={handleSubmit}>
            <h4 className='mr-wallace-font text-center mt-4 mb-5'>Mr Wallace</h4>
            <div>
              {props.error && (
                <div className='alert alert-danger'>
                  {props.error}
                </div>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='email'>correo electrónico</label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                maxLength='100'
                placeholder='Introduce tu correo electrónico'
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>contraseña</label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                maxLength='100'
                placeholder='Introduce tu contraseña'
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary btn-block my-4'>entrar</button>
          </form>
        </div>
      </section>
    </DefaultLayout>
  )
}
