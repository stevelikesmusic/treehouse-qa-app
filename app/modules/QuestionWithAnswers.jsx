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
  handleAnswerSubmit(answer) {
    const url = this.state.answerBaseUrl + '/answers'
    const request = new XMLHttpRequest()
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
  componentDidMount() {
    this.fetchAnswers(this.state.answerBaseUrl)
  },
  render() {
    return (
      <div>
        <h2 className="questions-title">{this.state.question}</h2>
        <AnswerList data={this.state.answers} />
        <AnswerForm onSubmit={this.handleAnswerSubmit} />
      </div>
    )
  }
})