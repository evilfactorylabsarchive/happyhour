import React from 'react'

class PureCanvas extends React.PureComponent {
  render () {
    return (
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={this.props.contextRef}
      />
    )
  }
}

export default PureCanvas
