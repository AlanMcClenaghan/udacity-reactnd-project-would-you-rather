import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'

class Dashboard extends Component {

  state = {
    answeredQuestionsSelected: false
  }

  toggleUnanswered = (e) => {

    this.setState(() => ({
      answeredQuestionsSelected: false
    }))

  }

  toggleAnswered = (e) => {
    this.setState(() => ({
      answeredQuestionsSelected: true
    }))
  }

  render() {

    const { answeredQuestionsSelected } = this.state
    const { authedUser, questions } = this.props

    const questionsArray = Object.keys(questions).map((key) => questions[key])

    questionsArray.sort((a, b) => b.timestamp - a.timestamp)

    let authedUserQuestionsArray = []

    if (answeredQuestionsSelected) {
      authedUserQuestionsArray = questionsArray.filter(question =>
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      )
    } else {
      authedUserQuestionsArray = questionsArray.filter(question =>
        !question.optionOne.votes.includes(authedUser) &&
        !question.optionTwo.votes.includes(authedUser)
      )
    }

    const authedUserQuestionsIds = authedUserQuestionsArray.map((question) => question["id"])

    return (
      <div>
        <div className="selector">
          <button
            className={!answeredQuestionsSelected ? "selector-button selected" : "selector-button"}
            onClick={this.toggleUnanswered}
          ><h3>Unanswered Questions</h3></button>
          <button
            className={answeredQuestionsSelected ? "selector-button selected" : "selector-button"}
            onClick={this.toggleAnswered}
          ><h3>Answered Questions</h3></button>
        </div>

        <ul className="dashboard-list">
          {authedUserQuestionsIds.map((id) => (
            <li key={id}>
              <QuestionList id={id} />
            </li>
          ))}
        </ul>

      </div >
    )
  }
}

const mapStateToProps = ({ authedUser, questions }) => {
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Dashboard)