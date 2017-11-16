import React, {Component} from 'react'
import ProjectList from '../components/ProjectList/ProjectList'
import {PROJECT_STATUS} from '../constants'
import {connect} from 'react-redux'
import {IndexLink} from "react-router"

class ProjectListContainer extends Component {

  componentDidMount() {
    this
      .props
      .getProjects();
  }

  render() {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Crowdfunding blockchained</h1>
            <p className="lead text-muted">Demo voor de Karel de Grote Hogeschool TI student conference days. 2017</p>
          </div>
        </section>
        <section className="container">
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <IndexLink
                to={{
                pathname: '/',
                query: {
                  filter: 0
                }
              }}
                className="nav-link"
                activeClassName="active">Alles</IndexLink>
            </li>
            <li className="nav-item">
              <IndexLink
                to={{
                pathname: '/',
                query: {
                  filter: 1
                }
              }}
                className="nav-link"
                activeClassName="active">Pending</IndexLink>
            </li>
            <li className="nav-item">
              <IndexLink
                to={{
                pathname: '/',
                query: {
                  filter: 2
                }
              }}
                className="nav-link"
                activeClassName="active">Success</IndexLink>
            </li>
            <li className="nav-item">
              <IndexLink
                to={{
                pathname: '/',
                query: {
                  filter: 3
                }
              }}
                className="nav-link"
                activeClassName="active">Failed</IndexLink>
            </li>
          </ul>
          <ProjectList {...this.props}/>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const {projects, project_ids, loading} = state.blockfund;
  const {
    location: {
      query: {
        filter
      }
    }
  } = props;

  return {
    projects,
    project_ids: project_ids.filter(id => {
      const p = projects[id];
      switch (parseInt(filter)) {
        case undefined:
        default:
          return true;
        case 1:
          return p.status === PROJECT_STATUS.PENDING;
        case 2:
          return p.status === PROJECT_STATUS.SUCCEEDED;
        case 3:
          return p.status === PROJECT_STATUS.FAILED;
      }
    }),
    loading
  }
}

export default connect(mapStateToProps)(ProjectListContainer)
