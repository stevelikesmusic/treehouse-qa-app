import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Questions from './modules/Questions'
import QuestionWithAnswers from './modules/QuestionWithAnswers'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Questions} />
    <Route path="/questions/:qId" component={QuestionWithAnswers} />
  </Router>
), document.getElementById('qa'))
