import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import LoginPage from './LoginPage';
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard';
import '../App.css';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null
              : this.props.authedUser === '' ? <LoginPage />
                : this.props.loading === true ? null
                  : <div>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/new' component={NewQuestion} />
                    <Route path='/leader' component={LeaderBoard} />
                  </div>}
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);