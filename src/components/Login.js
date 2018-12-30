import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

  logout = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(setAuthedUser(''))

  }

  render() {

    const { authedUser, users } = this.props

    let loggedInUserName = null
    let loggedInUserAvatar = null

    if (authedUser) {
      loggedInUserName = users[authedUser].name
      loggedInUserAvatar = users[authedUser].avatarURL
    }

    return (
      !authedUser ? null
        :
        <ul className="user">
          <li>Hello, {loggedInUserName}
          </li>
          <img
            src={loggedInUserAvatar}
            alt={loggedInUserName}
            className="nav-avatar"
          ></img>
          <li
            className="logout"
            onClick={this.logout}>
            Logout
          </li>
        </ul>
    )
  }
}

const mapStateToProps = ({ authedUser, users }) => {

  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(Login);