import React from 'react'
import config from '../../config'

export default React.createClass({
  componentDidMount() {
    const qId = this.props.params.qID
    const url = `${config.API_BASE}/questions/${qid}`
          
  },
  render() {
    const qId = this.props.params.qID
    const url = `${config.API_BASE}/questions/${qid}`
    return (
      <div>
        {url}
      </div>
    )
  }
})