import React from 'react'
import moment from 'moment'

export default React.createClass({
  render() {
    let createdAt = moment(this.props.createdAt).format('MMM Do, YYYY')
    return (
      <div>
        <div className="avatar">
          <span>{this.props.text}</span>
          <span>Asked on {createdAt}</span>
        </div>
      </div>
    )
  }
})