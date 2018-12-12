import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h3 className="center">Questions</h3>
        <ul className="dashboard-list">
          {this.props.questionsIds.map((id) => (
            <li key={id}>
              <Question id={id} />
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