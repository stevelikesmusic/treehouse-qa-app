import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <span>{this.props.upVotes}</span>
        <span>{this.props.answerText}</span>
        <div className="answerDates">
          <span>Answered: {this.props.createdAt} | </span>
          <span>Modified: {this.props.updatedAt}</span>
        </div>
      </div>
    )
  }
})