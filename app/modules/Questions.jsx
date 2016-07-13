import React from 'react'
import config from '../../config'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

export default React.createClass({
  getInitialState() {
    return {data: [], message: ''}
  },
  
  componentDidMount() {
    const url = `${config.API_BASE}/questions`
    const request = new XMLHttpRequest()
    
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status < 400) {
        this.setState({data: JSON.parse(request.responseText)})
      }
    }
    request.onerror = res => {
      this.setState({data: res})
    }
    request.open('GET', url)
    request.send(null)
  },
  
  handleQuestionSubmit(question) {
    const url = `${config.API_BASE}/questions`
    const request = new XMLHttpRequest()
    
    request.onload = function(res) {
      if (request.readyState === 4 && request.status < 400) {
        let questions = this.state.data
        let newQuestion = JSON.parse(request.responseText)
        fetch(url)
          .then(res => res.json())
          .then(question => this.setState({data: questions}))
      }
    }.bind(this)
    
    request.open('POST', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(question))
    
    let questions = this.state.data
    question._id = Date.now()
    let newQuestions = [question].concat(questions)
    this.setState({data: newQuestions})
  },
  
  render() {
    return (
      <div>
        <h1>Code Q&A</h1>
        <h1>{this.state.message}</h1>
        <QuestionForm onQuestionSubmit={this.handleQuestionSubmit}/>
        <QuestionList data={this.state.data} />
      </div>
    )
  }
})