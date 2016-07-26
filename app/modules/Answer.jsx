require('../styles/global.scss')
import React from 'react'
import Vote from './Vote'
import config from '../../config'
import moment from 'moment'

export default React.createClass({
  getInitialState() {
    return {
      readingAnswer: true,
      answerUrl: `${config.API_BASE}${this.context.location}/answers/${this.props.id}`,
      // Used to initialize answerText so it can be updated
      answerText: this.props.answerText,
      // Used to initialize updatedAt so it can be updated
      updatedAt: this.props.updatedAt
    }  
  },
  
  componentDidUpdate() {
    if (!this.state.readingAnswer) {
      document.getElementById('new-answer').focus()
    }
  },
  
  contextTypes: {
    location: React.PropTypes.string
  },
  
  handleVote(dir) { 
    fetch(`${this.state.answerUrl}/vote-${dir}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({text: this.state.answerText})
    })
    .then(response => response.json())
    .then(result => {console.log('I voted: '); console.log(result); })
    .catch(e => console.log(`There was an error with your post: ${e.name}--${e.message}`))
  },
  
  handleAnswerClick(e) {
    this.setState({readingAnswer: false})
  },
  
  handleNewAnswerChange(e) {
    if (!e.target.value) {
      throw new Error('You must have something for an answer')
    }
    this.setState({answerText: e.target.value})
  },
  
  updateAnswer(e) {
    e.preventDefault()
    if (!e.target.value) {
      e.target.focus()
      throw new Error('Cannot submit an empty answer. Please enter some text')
    }
    
    this.setState({readingAnswer: true})
    
    if (e.target.value.trim() !== this.props.answerText) {
      this.setState({updatedAt: new Date()})
      
      fetch(this.state.answerUrl, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({text: this.state.answerText.trim()})
      })
      .catch(e => console.log(`There was an error saving your new answer: ${e.name}--${e.message}`))
    }
  },
  
  deleteAnswer() {
    this.props.delete(this.state.answerUrl)
  },
  
  render() {
    let createdAt = `${moment(this.props.createdAt).format('MMM Do, YYYY')} at ${moment(this.props.createdAt).format('h:mm a')}`
    let updatedAt = `${moment(this.state.updatedAt).format('MMM Do, YYYY')} at ${moment(this.state.updatedAt).format('h:mm a')}`
    
    let readText = <span className="answer-text" title="Click to edit this answer" onClick={this.handleAnswerClick}>{this.state.answerText}</span>
    let writeText = <form onSubmit={this.updateAnswer}>
                      <input type="text" 
                           id="new-answer"
                           value={this.state.answerText} 
                           placeholder="Your answer..." 
                           onChange={this.handleNewAnswerChange} 
                           onBlur={this.updateAnswer} />
                    </form>
                    
    let answerText = this.state.readingAnswer ? readText : writeText      
          
    return (
      <div className="answer">
        <Vote votes={this.props.upVotes} handleVote={this.handleVote} />
          {answerText}
          <input type="button" onClick={this.deleteAnswer} value="Delete" />
        <div className="answer-dates">
          Answered: {createdAt} <span>|</span> Modified: {updatedAt}
        </div>
      </div>
    )
  }
})