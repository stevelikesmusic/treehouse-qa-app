import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {question: ''};
  },
  render: function() {
    return (
      <form className="questionForm" onSubmit={this.handleSubmit}>
        <input type="text" 
             value={this.state.question} 
             onChange={this.handleQuestionChange} 
             placeholder="What's your question?" />
        <input type="submit" value="Ask" />
      </form>
    );
  }
});