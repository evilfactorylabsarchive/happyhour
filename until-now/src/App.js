import React from 'react'
import Analyser from './Analyser'

class App extends React.Component {
  state = {
    isShowCredit: false,
    currentTime: 0,
    estimatedIndex: 0,
    whatever: '',
    // thanks: https://lirik.kapanlagi.com/artis/the-rain/hingga-detik-ini/
    lyrics: [
      '',
      'aku berdiri di sini di tempat dimana dulu',
      'pertama kita bertemu, pertama ku menatapmu',
      'ingatkah kau saat itu, kau tersenyum kepadaku',
      'berbekal senyuman itu ku jalani hidup',
      'hingga saat ini kau masih satu-satunya',
      'yang paling mengerti aku, semua baik burukku',
      'hingga detik ini aku masih orang itu',
      'kau kenal dengan hatimu, masih seperti dulu',
      'ingatkah kau saat itu, kau tersenyum kepadaku',
      'berbekal senyuman itu ku jalani hidup',
      'masih seperti dulu'
    ]
  }
  _triggerRaf = () => {
    window.scrollTo(0, 31337)
  }
  _hideScroll = () => {
    // IYKWIM
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
  }
  _showCredit = () => {
    this.setState({ isShowCredit: true })
  }
  _updateCurrentTime = time => {
    this.setState({ currentTime: Math.floor(time) })
    this._checkLyrics(this.state.currentTime)
  }
  _checkLyrics (time) {
    let activeLyrics
    // Does JavaScript has Macro or something related with that?
    switch (true) {
      case time < 9:
        activeLyrics = 0
        this._triggerRaf()
        break
      case time < 17:
        activeLyrics = 1
        this._hideScroll()
        break
      case time < 27:
        activeLyrics = 2
        break
      case time < 37:
        activeLyrics = 3
        break
      case time < 47:
        activeLyrics = 4
        break
      case time < 56:
        activeLyrics = 5
        break
      case time < 64:
        activeLyrics = 6
        break
      case time < 74:
        activeLyrics = 7
        break
      case time < 86:
        activeLyrics = 8
        break
      case time < 122:
        activeLyrics = 0
        break
      case time < 132:
        activeLyrics = 9
        break
      case time < 141:
        activeLyrics = 10
        break
      case time < 150:
        activeLyrics = 5
        break
      case time < 160:
        activeLyrics = 6
        break
      case time < 169:
        activeLyrics = 7
        break
      case time < 180:
        activeLyrics = 8
        break
      default:
        activeLyrics = 11
        break
    }
    this.setState({ estimatedIndex: activeLyrics })
  }
  render () {
    return (
      <React.Fragment>
        <div className='o-lyrics'>
          {this.state.estimatedIndex !== 0 && (
            <React.Fragment>
              <h2>
                {this.state.lyrics[this.state.estimatedIndex]}
              </h2>
              {this.state.isShowCredit &&
                <p>
                  <span>Song by The Rain - Hingga Detik Ini</span>
                  {` `}
                  <a href='https://108kb.io'>@108kb</a>
                </p>
              }
            </React.Fragment>
          )}
        </div>
        <Analyser
          showCredit={this._showCredit}
          updateCurrentTime={this._updateCurrentTime}
          audio='/music.mp3'
        />
      </React.Fragment>
    )
  }
}

export default App
