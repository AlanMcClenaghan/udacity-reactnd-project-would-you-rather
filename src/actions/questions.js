import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

const saveAnswer = ({ authedUser, qid, answer }) => {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export const handleSaveAnswer = (info) => {
  return (dispatch) => {
    dispatch(saveAnswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveAnswer: ', e)
        dispatch(saveAnswer(info))
        alert('There was an error saving your answer. Try again.')
      })
  }
}