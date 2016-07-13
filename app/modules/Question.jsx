import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

export default React.createClass({
  render() {
    let createdAt = moment(this.props.createdAt).format('MMM Do, YYYY')
    // Need to get the question id for route
    let route = `/questions/`
    return (
      <div>
        <Link to={route}>
          <div className="avatar">
          <span>{this.props.text}</span>
          <span>Asked on {createdAt}</span>
        </div>
        </Link>
      </div>
    )
  }
})