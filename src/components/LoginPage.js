import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../react-redux.jpg'

class LoginPage extends Component {

  state = {
    selectedUser: '',
  }

  handleSelectUser = (e) => {
    const selectedUser = e.target.value

    this.setState(() => ({
      selectedUser
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedUser } = this.state

    const authedUser = selectedUser.replace(/\s/g, "").toLowerCase()

    const { dispatch } = this.props

    dispatch(setAuthedUser(authedUser))

    this.setState(() => ({
      selectedUser: '',
    }))
  }

  render() {

    const { selectedUser } = this.state
    const { ...users } = this.props.users
    let image = ''

    if (selectedUser) {
      const selection = selectedUser.replace(/\s/g, "").toLowerCase()
      image = users[selection].avatarURL
    }

    return (
      <div className="question">
        <div className="question-heading">
          <h3>Welcome to the Would You Rather App!</h3>
          <p>Please sign-in to continue</p>
        </div>
        <div className="center">
          <img
            className="logo"
            src={selectedUser ? image : logo}
            alt="React-Redux logo"
          />
        </div>
        <div className="sign-in">
          <h3>Sign In</h3>
          <form className="new-question" onSubmit={this.handleSubmit}>
            <select
              className="block select"
              onChange={this.handleSelectUser}
            >
              <option>Select user:</option>
              {this.props.userIDs.map((id) => (
                <option key={id}>
                  {users[id].name}
                </option>
              ))}
            </select>
            <input
              className="btn"
              type="submit"
              disabled={selectedUser === ''}
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
    userIDs: Object.keys(users)
      .sort(users.name)
  }
}

export default connect(mapStateToProps)(LoginPage);