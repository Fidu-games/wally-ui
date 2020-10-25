import React from 'react'

export default class Game extends React.Component {
  componentDidMount () {
    const action = this.props.location.state.type
    if (action === 'create') {
      console.log('creating a new game')
    } else if (action === 'join') {
      const code = this.props.location.state.code
      console.log(`joining to a game with code: ${code}`)
    }
  }

  render () {
    return (
      <div>game</div>
    )
  }
}
