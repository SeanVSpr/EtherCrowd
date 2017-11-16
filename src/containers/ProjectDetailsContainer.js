import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProjectInfo from "../components/ProjectInfo/ProjectInfo"
import fetchAccounts from "../api/fetchAccounts"
import * as actionCreators from '../actions/project'
import ProjectActivity from "../components/ProjectActivity"

class ProjectDetailsContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      accounts: []
    }

    this.handleContribute = this
      .handleContribute
      .bind(this)
  }

  componentDidMount() {
    fetchAccounts().then(accs => {
      this.setState({accounts: accs})
    })
  }

  handleContribute(e) {
    e.preventDefault()
    const {params: {
        id
      }, contribute} = this.props;
    contribute(id, this.account.value, this.amount.value)
  }

  render() {
    const {project, params: {
        id
      }} = this.props;
    const {accounts} = this.state;

    if (!project) {
      return null; // TODO: Show loader??
    }

    return (
      <div className="container">
        <ProjectInfo project={project}/>

        <div className="my-3">
          <h2>Contribute</h2>
          <form className="form-inline">
            <select
              className="form-control mr-sm-2"
              ref={(i) => {
              if (i) {
                this.account = i
              }
            }}>{accounts.map((X) => {
                return <option key={X}>{X}</option>;
              })}</select>
            <input
              type="number"
              className="form-control mr-sm-2"
              ref={(i) => {
              if (i) {
                this.amount = i
              }
            }}/>
            <button onClick={this.handleContribute} className="btn btn-primary">Betaal</button>
          </form>
        </div>

        <ProjectActivity id={id}/>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {projects} = state.blockfund;
  const {params: {
      id
    }} = ownProps;

  return {project: projects[id]}
}

export default connect(mapStateToProps, actionCreators)(ProjectDetailsContainer)
