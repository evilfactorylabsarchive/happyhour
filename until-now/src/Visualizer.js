import React from 'react'
import PureCanvas from './Canvas'

class Visualizer extends React.Component {
  constructor (props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidUpdate () {
    this._paint()
  }

  _drawBar = ({ ctx, color, width, height, x, y }) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }

  _paint = () => {
    const canvas = this.canvasRef.current

    const ctx = canvas.getContext('2d')

    const CANVAS_WIDTH = canvas.width
    const CANVAS_HEIGHT = canvas.height

    this._drawBar({
      color: '#333333',
      ctx: ctx,
      x: 0,
      y: 0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    })

    let x = 0

    this.props.source.map((_, index) => {
      const height = this.props.source[index]
      const width = (CANVAS_WIDTH / this.props.bufferLength) * 1.5
      const y = CANVAS_HEIGHT - height

      this._drawBar({
        color: '#ffffff',
        ctx: ctx,
        x,
        y,
        width,
        height
      })
      return (x += width + 1)
    })
  }

  render () {
    return <PureCanvas contextRef={this.canvasRef} />
  }
}

export default Visualizer
