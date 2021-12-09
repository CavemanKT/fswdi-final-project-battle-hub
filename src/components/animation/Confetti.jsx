import React from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
}

export default class Confetti extends React.Component {
  constructor() {
    super()

    this.state = {
      fire: false,
      reset: false
    }
  }

  onClickFire = () => {
    // set any value that is cast to the logical true and will differ from the previous one.
    this.setState({ fire: {} })
  }

  onClickReset = () => {
    // set any value that is cast to the logical true and will differ from the previous one.
    this.setState({ reset: {} })
  }

  onFire = () => {
    console.log('do something after fire')
  }

  onReset = () => {
    console.log('do something after reset')
  }

  onDecay = () => {
    console.log('do something after animation')
  }

  render() {
    const style = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: -1
    }
    const { fire, reset } = this.state
    return (
      <>
        <ReactCanvasConfetti
          // set the styles as for a usual react component
          style={style}
          // set the class name as for a usual react component
          className="yourClassName"
          // if value in this.state.fire cast to the logical true and will differ from the previous, then will be called new animation
          fire={fire}
          // if value in this.state.reset cast to the logical true and will differ from the previous, then will be cleared canvas
          reset={reset}
          // set the callback on new animation
          onFire={this.onFire}
          // set the callback on decay animation
          onDecay={this.onDecay}
          // set the callback on reset canvas
          onReset={this.onReset}
        />

        <button type="button" onClick={this.onClickFire}>Fire</button>
        <button type="button" onClick={this.onClickReset}>Reset</button>
      </>
    )
  }
}
