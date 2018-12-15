import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionAnswer } from '../actions/questions'

class QuestionPage extends Component {

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
          <form action="">
            <input type="radio" name="vote" value="optionOne" /> {optionOne}<br />
            <p>{optionOneVotes} out of {totalVotes} votes</p>
            <input type="radio" name="vote" value="optionTwo" /> {optionTwo}<br />
          </form>
          <p>{optionTwoVotes} out of {totalVotes} votes</p>
          <button
            className="btn"
            onClick={this.handleVote}
          >Submit</button>
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