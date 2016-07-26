import React from 'react'
import Answer from './Answer'

export default React.createClass({  
  render: function() {
    let answerNodes = this.props.data.map(answer => {
      return <Answer answerText={answer.text}
                     upVotes={answer.upVotes}
                     createdAt={answer.createdAt}
                     updatedAt={answer.updatedAt}
                     id={answer._id}
                     delete={this.props.delete}
                     key={answer._id}></Answer>
    })
    
    return (
      <div className="answerList">
        {answerNodes}
      </div>
    )
  }
})