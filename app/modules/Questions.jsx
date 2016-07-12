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
        console.log('Response from GET')
        console.log(JSON.parse(request.responseText))
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
    
    request.onreadystate = function() {
      if (request.readyState === 4 && request.status < 400) {
        console.log('Response from POST')
        console.log(JSON.parse(request.responseText))
      }
    }.bind(this)
    request.open('POST', url)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(JSON.stringify(question))
    request.send(JSON.stringify(question))
  },
  
  fetchQuestions() {
    console.log('Got it')
    console.log(request.response)
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