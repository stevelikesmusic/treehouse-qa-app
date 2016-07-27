require('./styles/global.scss')
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Logo from './modules/Logo'
import Questions from './modules/Questions'
import QuestionWithAnswers from './modules/QuestionWithAnswers'

render((
  <Router history={browserHistory}>
    <Route component={Logo} >
      <Route path="/" component={Questions} />
      <Route path="/questions/:qId" components={QuestionWithAnswers} />
    </Route>
  </Router>
), document.getElementById('qa'))
