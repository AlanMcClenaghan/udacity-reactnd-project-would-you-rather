import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class Question extends Component {
  render() {
    console.log(this.props)

    const { question } = this.props

    const { name, id, timestamp, avatar, optionOne, optionTwo, optionOneVotes, optionTwoVotes } = question

    const totalVotes = optionOneVotes + optionTwoVotes

    console.log(question)

    return (
      <div className="question">
        <div>{name} asks:</div>
        <div>
          <img
            src={avatar}
            alt={`Avatar of ${name}`}
            className="avatar"
          />
        </div>
        <div className="question-info">
          <h3>Would you rather ...</h3>
          <form action="">
            <input type="radio" name="" value="optionOne" /> {optionOne}<br />
            <p>{optionOneVotes} out of {totalVotes}</p>
            <input type="radio" name="" value="optionTwo" /> {optionTwo}<br />
          </form>
          <p>{optionTwoVotes} out of {totalVotes}</p>
          <button className="btn">Submit</button>
        </div>



      </div >
    )
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id]

  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser)
  }
}

export default connect(mapStateToProps)(Question)