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

    let loggedInUserAvatar = null

    if (authedUser) {
      const loggedInUser = authedUser.replace(/\s/g, "").toLowerCase()
      loggedInUserAvatar = users[loggedInUser].avatarURL
    }

    return (
      !authedUser ? null
        :
        <ul className="user">
          <li>Hello, {authedUser}
          </li>
          <img
            src={loggedInUserAvatar}
            alt={authedUser}
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