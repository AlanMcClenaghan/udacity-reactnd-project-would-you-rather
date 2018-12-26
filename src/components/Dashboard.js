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

    let authedUserQuestionsArray = []

    if (answeredQuestionsSelected) {
      authedUserQuestionsArray = questionsArray.filter((question) => {
        if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
          console.log(question.id)
          authedUserQuestionsArray.push(question.id)
          console.log(authedUserQuestionsArray)
          return question
        }
      })
    } else {
      authedUserQuestionsArray = questionsArray.filter((question) => {
        if (!question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)) {
          console.log(question.id)
          authedUserQuestionsArray.push(question.id)
          console.log(authedUserQuestionsArray)
          return question
        }
      })
    }

    const authedUserQuestionsIds = authedUserQuestionsArray.map((question) => question["id"])

    console.log(authedUserQuestionsIds)

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

      </div>
    )
  }
}

const mapStateToProps = ({ authedUser, questions }) => {
  return {
    authedUser,
    questions,
    // questionsIds: Object.keys(questions)
    //   .sort((a, b) => questions[b].timestamp - questions[b].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)