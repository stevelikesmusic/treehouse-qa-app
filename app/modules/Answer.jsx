require('../styles/global.scss')
import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="answer">
        <span>{this.props.upVotes}</span>
        <span className="answer-text">{this.props.answerText}</span>
        <div className="answer-dates">
          <span>Answered: {this.props.createdAt} | </span>
          <span>Modified: {this.props.updatedAt}</span>
        </div>
      </div>
    )
  }
})