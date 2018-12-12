import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <div>
        <h1>App</h1>
      </div>
    );
  }
}

export default connect()(App);