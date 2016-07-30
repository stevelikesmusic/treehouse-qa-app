require('./styles/global.scss')
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import routes from './modules/routes'

render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('app'))
