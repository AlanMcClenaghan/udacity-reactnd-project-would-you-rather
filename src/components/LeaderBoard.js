import React, { Component } from 'react'
import { connect } from 'react-redux'


class LeaderBoard extends Component {

  render() {

    const { users } = this.props

    console.log(users)

    const usersArray = Object.keys(users).map((user) => users[user])


    console.log(usersArray)

    const OrderedUserArray = usersArray.sort((a, b) => {
      const numA = Object.keys(a.answers).length + a.questions.length
      const numB = Object.keys(b.answers).length + b.questions.length
      return numB - numA
    })

    console.log(OrderedUserArray)

    return (
      <div className="center" >
        <h3>Leader Board</h3>
        <ul>
          {OrderedUserArray.map((user) => (
            <li key={user.id}>
              <div className="question">
                <div className="question-heading"><h3>{user.name}</h3></div>
                <div className="avatar-container">
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className="avatar"
                  />
                </div>
                <div className="question-info">
                  <div><p>Answered Questions: {Object.keys(user.answers).length}</p></div>
                  <div><p>Create Questions: {user.questions.length}</p></div>
                  <div><p>Score: {Object.keys(user.answers).length + user.questions.length}</p></div>
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

  console.log(users)

  return {
    users
  }
}

export default connect(mapStateToProp)(LeaderBoard)