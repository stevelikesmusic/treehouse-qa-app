import React from 'react'
import { Route } from 'react-router'
import Logo from './Logo.jsx'
import Questions from './Questions.jsx'
import QuestionWithAnswers from './QuestionWithAnswers.jsx'

module.exports = (
  <Route component={Logo} >
    <Route path="/" component={Questions} />
    <Route path="/questions/:qId" components={QuestionWithAnswers} />
  </Route>
)