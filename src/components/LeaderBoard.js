import React, { Component } from 'react'
import { connect } from 'react-redux'


class LeaderBoard extends Component {

  render() {

    const { users } = this.props

    const usersArray = Object.keys(users).map((user) => users[user])

    const OrderedUserArray = usersArray.sort((a, b) => {
      const numA = Object.keys(a.answers).length + a.questions.length
      const numB = Object.keys(b.answers).length + b.questions.length
      return numB - numA
    })

    return (
      <div className="center" >
        <h3>Leader Board</h3>
        <ul>
          {OrderedUserArray.map((user) => (
            <li key={user.id}>
              <div className="question">
                <div className="question-heading"><h3>{user.name}</h3></div>
                <div className="avatar-container leaderboard">
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className="avatar"
                  />
                </div>
                <div className="question-info leaderboard">
                  <div className="bold"><p>Answered Questions: {Object.keys(user.answers).length}</p></div>
                  <div className="bold"><p>Created Questions: {user.questions.length}</p></div>
                </div>
                <div className="question-info leaderboard score">
                  <div className="score-heading"><p>Score</p></div>
                  <div className="score-number"><h3>{Object.keys(user.answers).length + user.questions.length}</h3></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProp({ users }) {

  return {
    users
  }
}

export default connect(mapStateToProp)(LeaderBoard)