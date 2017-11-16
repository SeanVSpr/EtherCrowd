import React, {Component} from 'react'
import {connect} from 'react-redux'
import './App.css'
import Header from "./components/Main/Header"
import * as actionCreators from './actions/project'

class App extends Component {

  componentDidMount() {
    const {getProjects} = this.props;

    getProjects();

  }

  render() {
    const {getProjects} = this.props;

    return (
      <div className="App">
        <Header/>
        <main className="section">
          {React.cloneElement(this.props.children, {getProjects: getProjects})}
        </main>
      </div>
    )
  }
}

export default connect(null, actionCreators)(App)
