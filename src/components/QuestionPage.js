import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'
import { NavLink } from 'react-router-dom'

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

    const { answer } = this.state

    const { question, authedUser, votesOptionOne, votesOptionTwo } = this.props

    const { name, avatar, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = question

    const totalVotes = optionOneVotes + optionTwoVotes
    const percentageOptionOne = (optionOneVotes / totalVotes * 100).toFixed()
    const percentageOptionTwo = (optionTwoVotes / totalVotes * 100).toFixed()

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    let answered = false

    if (votesOptionOne.includes(authedUser) || votesOptionTwo.includes(authedUser)) {
      answered = true
    }

    let authedUserAnswer

    if (votesOptionOne.includes(authedUser)) {
      authedUserAnswer = "optionOne"
    } else if (votesOptionTwo.includes(authedUser)) {
      authedUserAnswer = "optionTwo"
    } else {
      authedUserAnswer = null
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
          {answered ? <div>
            <p>{optionOne} {authedUserAnswer === "optionOne" ? <b>&#10004;</b> : null}</p>

            <p>{optionOneVotes} out of {totalVotes} votes ({percentageOptionOne}%)</p>
            <p>{optionTwo} {authedUserAnswer === "optionTwo" ? <b>&#10004;</b> : null}</p>
            <p>{optionTwoVotes} out of {totalVotes} votes ({percentageOptionTwo}%)</p>
            <NavLink to={`/`}>
              <button className="btn">Return to Home</button>
            </NavLink>
          </div>
            : <form action="" onSubmit={this.handleVote}>
              <input
                type="radio"
                name="vote"
                value="optionOne"
                onChange={this.handleSelection} />
              {optionOne}
              <p>or</p>
              <input
                type="radio"
                name="vote"
                value="optionTwo"
                onChange={this.handleSelection} />
              {optionTwo}
              <br />
              <input
                className="btn"
                type="submit"
                value="submit"
                disabled={answer === null}
              />
            </form>}
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
    votesOptionOne: question.optionOne.votes,
    votesOptionTwo: question.optionTwo.votes,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionPage)