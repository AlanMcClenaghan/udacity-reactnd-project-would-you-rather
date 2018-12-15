import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionAnswer } from '../actions/questions'
import { NavLink } from 'react-router-dom'


class QuestionList extends Component {

  handleVote = (e) => {
    e.preventDefault()

    console.log(e)

    // todo: Handle vote
    const { dispatch, question, authedUser } = this.props

    // dispatch(handleQuestionAnswer({
    //   id: question.id,
    //   vote: question.vote,
    //   authedUser
    // }))
  }

  render() {
    console.log(this.props)

    const { question } = this.props

    const { name, id, timestamp, avatar, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = question

    const totalVotes = optionOneVotes + optionTwoVotes

    console.log(question)

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    return (
      <NavLink to={`/question/${id}`} className="question">
        <div className="question-heading"><h3>{name} asks:</h3></div>
        <div className="avatar-container">
          <img
            src={avatar}
            alt={`Avatar of ${name}`}
            className="avatar"
          />
        </div>
        <div className="question-info">
          <h3>Would you rather ...</h3>
          <p>{optionOne}<br />or<br />{optionTwo}</p>
          <button className="btn">View Poll</button>
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionList)