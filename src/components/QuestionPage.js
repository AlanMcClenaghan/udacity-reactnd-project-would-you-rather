import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'

class QuestionPage extends Component {

  state = {
    answer: null
  }

  handleSelection = (e) => {

    const answer = e.target.value

    this.setState(() => ({
      answer
    }))

  }

  handleVote = (e) => {

    e.preventDefault()

    const { answer } = this.state

    const { dispatch, question, authedUser } = this.props

    dispatch(handleSaveAnswer({
      qid: question.id,
      answer: answer,
      authedUser
    }))

    this.setState(() => ({
      answer: null
    }))
  }

  render() {
    const { question } = this.props

    const { name, avatar, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = question

    const totalVotes = optionOneVotes + optionTwoVotes

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
          <form action="" onSubmit={this.handleVote}>
            <input
              type="radio"
              name="vote"
              value="optionOne"
              onChange={this.handleSelection} />
            {optionOne}
            <br />
            <p>{optionOneVotes} out of {totalVotes} votes</p>
            <input
              type="radio"
              name="vote"
              value="optionTwo"
              onChange={this.handleSelection} />
            {optionTwo}
            <br />
            <p>{optionTwoVotes} out of {totalVotes} votes</p>
            <input
              className="btn"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.match.params
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionPage)