import React from 'react'
import config from '../../config'

export default React.createClass({
  getInitialState: function() {
    return {question: ''};
  },
  
  handleQuestionChange(e) {
    this.setState({question: e.target.value})
  },
  
  handleSubmit(e) {
    e.preventDefault()
    let question = this.state.question.trim()
    if (!question) return
    
    // submit form
    this.props.onQuestionSubmit({text: question})
    // reset form state
    this.setState({question: ''})
  },
  
  render: function() {
    return (
      <form className="question-form" onSubmit={this.handleSubmit}>
        <input type="text" 
               className="question-input"
               value={this.state.question} 
               onChange={this.handleQuestionChange} 
               placeholder="What's your question?" />
        <input className="question-submit" type="submit" value="Ask" />
      </form>
    );
  }
});