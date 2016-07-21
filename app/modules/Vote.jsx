require('../styles/global.scss')
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="vote-toggle">
        <i className="fa fa-angle-up" aria-hidden="true"></i>
        <span className="vote-total">{this.props.votes}</span>
        <i className="fa fa-angle-down" aria-hidden="true"></i>
      </div>
    )
  }
})