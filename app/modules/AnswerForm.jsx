import React from 'react'
import config from '../../config'
import utility from '../../utility'

export default React.createClass({
  getInitialState() {
    return {answer: ''}
  },
  
  handleAnswerChange(e) {
    utility.toggleDisableSubmit(e, 'a-submit')
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
      <div className="answer-form">
        <h3>Add an answer</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.answer} 
                    onChange={this.handleAnswerChange} 
                    placeholder="Your answer..." />
          <input id="a-submit" type="submit" value="Post Answer" disabled />
        </form>
      </div>
    )
  }
})