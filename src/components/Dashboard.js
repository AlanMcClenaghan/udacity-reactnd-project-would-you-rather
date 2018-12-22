import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'

class Dashboard extends Component {

  render() {
    return (
      <div>
        {/* Change to Answered/Unanswered buttons*/}
        <div className="selector">
          <button className="selector-button"><h3>Unanswered Questions</h3></button>
          <button className="selector-button"><h3>Answered Questions</h3></button>
        </div>

        <ul className="dashboard-list">
          {this.props.questionsIds.map((id) => (
            <li key={id}>
              <QuestionList id={id} />
            </li>
          ))}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = ({ questions }) => {
  return {
    questionsIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[b].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)