import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Questions from './modules/Questions'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Questions} />
  </Router>
), document.getElementById('qa'))
