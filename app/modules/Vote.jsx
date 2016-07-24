require('../styles/global.scss')
import React from 'react'
import { browserHistory } from 'react-router'

export default React.createClass({
  getInitialState() {
    return {
      votes: this.props.votes,
    }
  },
  handleUpvote() {
    this.setState({votes: this.state.votes += 1})
    this.props.handleVote('up')
  },
  handleDownvote() {
    this.setState({votes: this.state.votes -= 1})
    this.props.handleVote('down');
  },
  render() {
    return (
      <div className="vote-toggle">
        <i className="fa fa-angle-up" 
           aria-hidden="true" onClick={this.handleUpvote}></i>
        <span className="vote-total">{this.state.votes}</span>
        <i className="fa fa-angle-down" 
           aria-hidden="true" onClick={this.handleDownvote}></i>
      </div>
    )
  }
})