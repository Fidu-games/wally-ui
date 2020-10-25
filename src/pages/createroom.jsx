import React, { Component } from 'react'
import DefaultLayout from '../layouts/default'
import config from '../config.json'

class CreateRoom extends Component {
  constructor (props) {
    super()
    this.sendToPS = this.sendToPS.bind(this)
  }

  sendToPS (e) {
    e.preventDefault()
    const playersLimit = this.refs.playersLimit.value
    window.location.href = `${config.peer_server.URL}/room/create/${playersLimit}`
  }

  render () {
    return (
      <DefaultLayout title='create room' links={[]}>
        <div>
          <div>
            <form onSubmit={this.sendToPS}>
              <div className='form-group'>
                <label htmlFor='playersLimit'>Jugadores</label>
                <input
                  type='number'
                  id='playersLimit'
                  name='playersLimit'
                  ref='playersLimit'
                  className='form-control'
                  min='1'
                  max='6'
                  placeholder='¿Cuantos van a jugar?'
                  required
                  autoFocus
                />
              </div>
              <button type='submit' id='submiter' className='btn btn-primary'>crear</button>
            </form>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export default CreateRoom
