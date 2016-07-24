require('../styles/global.scss')
import React from 'react'
import Vote from './Vote'
import config from '../../config'

export default React.createClass({
  contextTypes: {
    location: React.PropTypes.string
  },
  handleVote(dir) {
    const url = `${config.API_BASE}${this.context.location}/answers/${this.props.id}/vote-${dir}`
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({text: this.props.answerText})
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(e => console.log(`There was an error with your post: ${e.name}--${e.message}`))
  },
  render() {
    return (
      <div className="answer">
        <Vote votes={this.props.upVotes} handleVote={this.handleVote} />
        <span className="answer-text">{this.props.answerText}</span>
        <div className="answer-dates">
          Answered: {this.props.createdAt} <span>|</span> Modified: {this.props.updatedAt}
        </div>
      </div>
    )
  }
})