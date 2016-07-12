import React from 'react'
import Question from './Question'

export default React.createClass({
  render: function() {
    let questionNodes = this.props.data.map(function(question) {
      return <Question text={question.text} createdAt={question.createAt} key={question._id}/>
    })
    return (
      <div className="questionList">{questionNodes}</div>
    )
  }
})