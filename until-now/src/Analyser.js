import React from 'react'
import Visualizer from './Visualizer'

class Analyser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPlayButton: false,
      frequencyData: [],
      currentTime: 0,
      fftSize: 512 // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
    }
    this.audioRef = React.createRef()
  }
  _nextTick = () => {
    this.analyser.getByteFrequencyData(this.frequencyData)
    this.setState({ frequencyData: this.frequencyData })
    this.props.updateCurrentTime(this.audioRef.current.currentTime)
    this.rafId = requestAnimationFrame(this._nextTick)

    if (Math.floor(this.audioRef.current.currentTime) >= this.props.totalDuration) {
      this.props.showCredit()
      setTimeout(() => {
        cancelAnimationFrame(this.rafId)
      }, 5000)
    }
  }
  _start = () => {
    // FIXME: Still don't know why on mobile
    // Sometimes the state is `running` but
    // the audio not play (maybe network problem). For now let's fix
    // this by show the control
    // ANOTHER FIXME: Safari treat the audio as Live Broadcast
    // Learn more about that later
    this.audioContext.resume()
    this.audioRef.current.play()
    this.setState({ showPlayButton: false })
  }
  componentDidMount () {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.analyser = this.audioContext.createAnalyser()    

    this.source = this.audioContext.createMediaElementSource(
      this.audioRef.current
    )
    this.destination = this.audioContext.destination

    this.analyser.fftSize = this.state.fftSize
    this.analyser.connect(this.destination)
    this.source.connect(this.analyser)

    this.bufferLength = this.analyser.frequencyBinCount
    this.frequencyData = new Uint8Array(this.bufferLength)

    if (this.audioContext.state !== 'running') {
      this.setState({ showPlayButton: true })
    } else {
      this._start()
    }

    this.rafId = requestAnimationFrame(this._nextTick)
  }
  componentWillUnmount () {
    cancelAnimationFrame(this.rafId)
    this.analyser.disconnect()
    this.source.disconnect()
  }
  render () {
    return (
      <React.Fragment>
        {this.state.showPlayButton && <div className='o-lyrics'>
          <p>
            click button below to play
          </p>
          <button onClick={this._start}>
            play
          </button>
        </div>}
        <Visualizer
          source={this.state.frequencyData}
          bufferLength={this.bufferLength}
        />
        <audio
          controls={!!navigator.userAgent.match(/iphone|android|blackberry/ig)}
          ref={this.audioRef}
          src={this.props.audio}
        />
      </React.Fragment>
    )
  }
}

export default Analyser
