require('../styles/global.scss')
import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'
//import avatar from '../../public/images/avatar.png'
const avatar = require('../../public/images/avatar.png')

export default React.createClass({
  render() {
    let createdAt = moment(this.props.createdAt).format('MMM Do, YYYY')
    // Need to get the question id for route
    let route = `/questions/${this.props.id}`
    return (
      <div className="question">
        <Link to={route}>
          <img src={avatar} className="avatar" />
            <span className="question-text">{this.props.text}</span>
            <span className="question-date">Asked on {createdAt} </span>
        </Link>
      </div>
    )
  }
})