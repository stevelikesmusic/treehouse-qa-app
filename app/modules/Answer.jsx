require('../styles/global.scss')
import React from 'react'
import Vote from './Vote'

export default React.createClass({
  render() {
    return (
      <div className="answer">
        <Vote votes={this.props.upVotes} />
        <span className="answer-text">{this.props.answerText}</span>
        <div className="answer-dates">
          <div>Answered: {this.props.createdAt} <span>|</span> Modified: {this.props.updatedAt}</div>
        </div>
      </div>
    )
  }
})