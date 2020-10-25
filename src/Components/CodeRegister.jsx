import React, { Component } from 'react'
import config from '../config.json'
import { Redirect } from 'react-router-dom'

function DataSender(props) {
  let { color, room, nickname, uid } = props.data
  return (
    <Redirect to={{
      pathname: '/gameControl',
      search: `?room=${room}&uid=${uid}&nickname=${nickname}&color=${color}`
    }} />
  )
}

class CodeRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      room: '',
      error: ''
    }
    this.handleCodeSubmit = this.handleCodeSubmit.bind(this)
  }

  async sendCodeToAPI (code) {
    try {
      console.log(code)
      let result = await window.fetch(config.api.url + '/room/exists/' + code)
      if (!result.ok) throw new Error('No se ha podido contactar con el servidor')
      return await result.json()
    } catch (e) {
      console.log(e)
    }
  }

  async handleCodeSubmit (e) {
    e.preventDefault()
    const code = this.refs.code.value
    console.log(code)
    if (!code) {
      this.setState({ error: 'Escribe un código válido' })
      return
    }
    const result = await this.sendCodeToAPI(code)
    console.log(result)
    if (!result || !result.success) {
      this.setState({ error: 'Escribe un código válido' })
      return
    }

    this.setState({
      room: result.data.roomID
    }, () => {
      this.setState({
        redirect: true
      })
    })
  }

  render () {
    return (
      <div className='d-flex justify-content-center'>
        <div>{this.state.error}</div>
        <form onSubmit={this.handleCodeSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='code'
              id='code'
              ref='code'
              placeholder='room code'
              className='form-control code-form'
              maxLength='10'
              required
              autoFocus
            />
          </div>
          <button className='btn btn-primary btn-block'>ENTRAR</button>
        </form>
      </div>
    )
  }
}

export default CodeRegister