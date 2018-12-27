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
    const { question, authedUser, votesOptionOne, votesOptionTwo } = this.props

    console.log(question)
    console.log(authedUser)
    console.log(votesOptionOne)
    console.log(votesOptionTwo)

    const { name, avatar, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = question

    console.log(optionOneVotes)

    const totalVotes = optionOneVotes + optionTwoVotes

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    let answered = false

    if (votesOptionOne.includes(authedUser) || votesOptionTwo.includes(authedUser)) {
      answered = true
    }

    console.log(answered)

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
            <p>{optionOne}</p>
            <p>{optionOneVotes} out of {totalVotes} votes</p>
            <p>{optionTwo}</p>
            <p>{optionTwoVotes} out of {totalVotes} votes</p>
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

  console.log(id)
  console.log(questions)
  console.log(question.optionOne.votes)

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