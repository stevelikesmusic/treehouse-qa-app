require('../styles/global.scss')
import React from 'react'
import Question from './Question'

export default React.createClass({
  render: function() {
    let questionNodes = this.props.data.map(function(question) {
      return <Question text={question.text} 
                       createdAt={question.createdAt} 
                       id={question._id}
                       key={question._id} />
    })
    return (
      <div className="questionList">
        <h2 className="questions-title">Top Questions</h2>
        {questionNodes}
      </div>
    )
  }
})