import React from 'react'
import config from '../config'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

export default React.createClass({
  getInitialState() {
    return {data: [], message: ''}
  },
  componentDidMount() {
    const url = `${config.API_BASE}/questions`
    const request = new XMLHttpRequest()
    
    request.onreadystatechange = function() {
//      console.log(request.readyState)
//      console.log(request.status)
      if (request.readyState === 4 && request.status === 200) {
        this.setState({data: JSON.parse(request.responseText)})
      }
    }.bind(this)
    request.onerror = function(res) {
      this.setState({data: res})
    }.bind(this) 
    request.open('GET', url)
    request.send(null)
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
        <QuestionForm />
        <QuestionList data={this.state.data} />
      </div>
    )
  }
})