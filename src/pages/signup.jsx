import React, { Component } from 'react'

import * as API from '../api/API'

import '../stylesheets/signup.css'
import SignUpForm from '../components/signUpForm'

class SignUp extends Component {
  constructor (props) {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onValid = this.onValid.bind(this)

    this.state = {
      form: {},
      loading: false,
      alert_state: 'none',
      message: '',
      error: ''
    }
  }

  handleChange (e) {
    const prevForm = this.state.form
    prevForm[e.target.name] = e.target.value
    this.setState({
      form: prevForm
    })
  }

  onValid (state) {
    this.setState({
      valid: state
    })
  }

  handleResponse (res) {
    console.log(res)

    if (res == null || !res.success) {
      this.setState({
        loading: false,
        error: res.messages || res.errors
      })
    } else {
      this.props.history.push('/game')
    }
  }

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true, error: '' })
    const response = await API.Auth.signUp(this.state.form)
    this.handleResponse(response)
  }

  render () {
    return (
      <SignUpForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        error={this.state.error}
        loading={this.state.loading}
        setValidity={this.onValid}
      />
    )
  }
}

export default SignUp
