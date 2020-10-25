import React, { Component } from 'react'
import * as API from '../api/API'
import GameLayout from '../layouts/game'
import Player from '../components/Player'
import Customizer from '../components/Customizer'
import CodeRegister from '../components/CodeRegister'

import UpdateForm from '../components/updateForm'
import CodeForm from '../components/CodeForm'

import '../stylesheets/player.css'

class PlayerView extends Component {
  constructor (props) {
    super()
    this.state = {
      loading: true,
      loading_state: 'Loading...',
      spriteColor: 'blue',
      player: {},
      currentView: 0,
      updateError: null,
      updateForm: {}
    }

    this.handleCloseSession = this.handleCloseSession.bind(this)
    this.handleChangePlayerSprite = this.handleChangePlayerSprite.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.changeView = this.changeView.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNewRoom = this.handleNewRoom.bind(this)
  }

  handleChange (e) {
    const prevData = this.state.updateForm
    prevData[e.target.name] = e.target.value
    this.setState({ updateForm: prevData })
  }

  async checkAuthentication () {
    if (!API.token) {
      const result = await API.Auth.refreshToken()
      if (!result.success) {
        this.props.history.push('/login')
        return false
      }
    }
    return true
  }

  async componentDidMount () {
    if (!(await this.checkAuthentication())) return
    this.setState({ loading_state: 'Verifying player data...' })
    const result = await API.Player.getPlayer()
    console.log(result)
    if (result && result.success) {
      this.setState({
        player: result.data,
        loading: false,
        updateForm: { name: result.data.name, nickname: result.data.nickname }
      })
    } else {
      this.props.history.push('/')
    }
  }

  async handleCloseSession () {
    this.setState({
      loading: true,
      loading_state: 'Wait a few seconds...'
    })
    await API.Auth.logOut()
    this.props.history.push('/')
  }

  handleChangePlayerSprite (color) {
    this.setState({
      spriteColor: color
    })
  }

  async handleUpdate (e) {
    e.preventDefault()
    const name = this.state.updateForm.name || this.state.player.name
    const nickname = this.state.updateForm.nickname || this.state.player.nickname

    const result = await API.Player.updatePlayer(name, nickname)
    if (!result.success) {
      this.setState({
        updateError: result.errors
      })
      return
    }
    const prevData = this.state.player
    prevData.name = name
    prevData.nickname = nickname
    this.setState({ prevData })
  }

  changeView (id) {
    this.setState({ currentView: id })
  }

  handleNewRoom () {
    this.props.history.push({
      pathname: '/game',
      state: {
        type: 'create'
      }
    })
  }

  render () {
    if (this.state.loading) return <p>{this.state.loading_state}</p>
    return (
      <GameLayout>
        <div className='game-shadow'>
          <div className='row'>
            {
              this.state.currentView === 0 && (
                <div className='Menu col-lg-12'>
                  <div className='buttons-container'>
                    <div className='btn-cont'>
                      <h1 className='mt-5 mb-2'>{'Wally'.trim()}</h1>
                      <p>{this.state.player.nickname}</p>
                    </div>
                    <div className='btn-cont'>
                      <button onClick={this.handleNewRoom}>Crear una sala</button>
                    </div>
                    <div className='btn-cont'>
                      <button onClick={() => this.changeView(2)}>Entrar a una sala</button>
                    </div>
                    <div className='btn-cont'>
                      <button onClick={() => this.changeView(3)}>Actualizar Datos</button>
                    </div>
                    <div className='btn-cont'>
                      <button onClick={this.handleCloseSession}>Salir</button>
                    </div>
                  </div>
                </div>
              )
            }
            {
              this.state.currentView === 2 && (
                <CodeForm
                  onCancel={() => this.changeView(0)}
                />
              )
            }
            {
              this.state.currentView === 3 && (
                <UpdateForm
                  prevForm={this.state.updateForm}
                  onSubmit={this.handleUpdate}
                  onChange={this.handleChange}
                  error={this.state.updateError}
                  onChangeView={() => this.changeView(0)}
                />
              )
            }
          </div>
        </div>
      </GameLayout>
    )
  }
}

export default PlayerView
