import React, { Component } from 'react'
import * as API from '../api/API'

import LoginForm from '../components/loginForm'

import '../stylesheets/login.css'

class Login extends Component {
  constructor (props) {
    super()
    this.state = {
      message: '',
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (email, password) {
    this.setState({ loading: true })
    console.log(email, password)
    const response = await API.Auth.logIn(email, password)
    if (!response.success) {
      this.setState({
        loading: false,
        message: response.messages || response.errors
      })

      setTimeout(() => {
        this.setState({
          message: ''
        })
      }, 4000)

      return
    }

    this.props.history.push('/player')
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>

    return (
      <LoginForm
        onSubmit={this.handleSubmit}
        error={this.state.message}
      />
    )
  }
}

export default Login
