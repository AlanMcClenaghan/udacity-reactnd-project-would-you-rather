import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { NavLink } from 'react-router-dom'


class QuestionList extends Component {

  render() {

    const { question } = this.props

    const { name, id, avatar, optionOne, optionTwo } = question

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    return (
      <div className="question">
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
          <NavLink to={`/question/${id}`}>
            <button className="btn">View Poll</button>
          </NavLink>
        </div>
      </div>
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