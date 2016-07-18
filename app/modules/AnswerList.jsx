import React from 'react'
import Answer from './Answer'

export default React.createClass({
  render() {
    let answerNodes = this.props.data.map(answer => {
      return <Answer answerText={answer.text}
                     upVotes={answer.upVotes}
                     createdAt={answer.createAt}
                     updateAt={answer.updatedAt}
                     id={answer._id}
                     key={answer._id}></Answer>
    })
    return (
      <div className="answerList">
        {answerNodes}
      </div>
    )
  }
})