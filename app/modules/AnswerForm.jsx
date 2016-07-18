import React from 'react'
import config from '../../config'

export default React.createClass({
  getInitialState() {
    return {answer: ''}
  },
  handleAnswerChange(e) {
    this.setState({answer: e.target.value})
  },
  handleSubmit(e) {
    e.preventDefault()
    let answer = this.state.answer.trim()
    if (!answer) return
    
    this.props.onSubmit({text: answer})
    
    this.setState({answer: ''})
  },
  render() {
    return (
      <div className="answerFormContainer">
        <h3>Add an answer</h3>
        <form className="answerForm" onSubmit={this.handleSubmit}>
          <textarea value={this.state.answer} 
                    onChange={this.handleAnswerChange} 
                    placeholder="Your answer..." />
          <input type="submit" value="Post Answer" />
        </form>
      </div>
    )
  }
})