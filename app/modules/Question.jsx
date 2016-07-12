import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        Question: {this.props.text}
      </div>
    )
  }
})