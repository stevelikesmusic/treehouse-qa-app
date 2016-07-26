import React from 'react'
import config from '../../config'
import AnswerForm from './AnswerForm'
import AnswerList from './AnswerList'

export default React.createClass({
  childContextTypes: {
    location: React.PropTypes.string
  },
  
  getChildContext() {
    return {location: this.props.location.pathname}
  },
  
  getInitialState() {
    return {
      question: '',
      createAt: '',
      answers: [],
      answerBaseUrl: `${config.API_BASE}/questions/${this.props.params.qId}`
    }
  },
  
  componentDidMount() {
    this.fetchAnswers(this.state.answerBaseUrl)
  },
  
  handleAnswerSubmit(answer) {
    const url = this.state.answerBaseUrl + '/answers'
    fetch(`${this.state.answerBaseUrl}/answers`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(answer)
    })
    .then(res => res.json())
    .then(answer => this.fetchAnswers(this.state.answerBaseUrl))
  },
  
  fetchAnswers(url) {
    fetch(url)
      .then(res => res.json())
      .then(question => {
        this.setState({
          question: question.text,
          createdAt: question.createdAt,
          answers: question.answers
        })
      })
  },
  
  deleteAnswer(url) {
    let id = url.slice(url.lastIndexOf('/') + 1)
    let newAnswers = this.state.answers.map(answer => answer.id === id)
        
    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
    .then(res => res.json())
    .then(question => this.setState({answers: question.answers}))
    .catch(e => console.log('There was a problem deleting your answer: ' + e))
  },
  
  render() {
    return (
      <div>
        <h2 className="questions-title">{this.state.question}</h2>
        <AnswerList data={this.state.answers} delete={this.deleteAnswer}/>
        <AnswerForm onSubmit={this.handleAnswerSubmit} />
      </div>
    )
  }
})