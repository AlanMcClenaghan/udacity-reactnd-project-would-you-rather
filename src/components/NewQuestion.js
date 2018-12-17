import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))

  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))

  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state

    const { dispatch } = this.props

    // todo: Add Question to store
    console.log('New Question: ', optionOne, optionTwo)
    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true
    }))

  }

  render() {

    const { optionOne, optionTwo, toHome } = this.state

    if (toHome) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className="center">Create New Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <p>Complete the question:</p>
          <h3>Would you rather...</h3>
          <input
            type="text"
            placeholder="Enter Option One Text Here"
            value={optionOne}
            onChange={this.handleChangeOptionOne}
            className="question-input" />
          <h3 className="center">OR</h3>
          <input
            type="text"
            placeholder="Enter Option Two Text Here"
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
            className="question-input" />
          <br />
          <button
            className="btn"
            type="submit"
            disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)