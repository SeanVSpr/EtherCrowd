import React, {Component, PropTypes} from 'react'
import {Link} from "react-router"
import {PROJECT_STATUS} from "../../constants"
import Spinner from '../Spinner/Spinner'

class ProjectList extends Component {
  constructor(props) {
    super(props);

    this.renderProject = this
      .renderProject
      .bind(this);
  }
  render() {
    const {project_ids, loading} = this.props;

    if (loading) {
      return <Spinner/>
    }

    return (
      <div className="row">
        {project_ids.map(this.renderProject)}
      </div>
    )
  }

  renderProject(id) {
    const {projects} = this.props;

    const {
      project_id,
      title,
      status,
      progress,
      contributors,
      contributions,
      deadline_for_display
    } = projects[id];

    let badge = "primary";

    if (status === PROJECT_STATUS.FAILED) {
      badge = "danger"
    } else if (status === PROJECT_STATUS.SUCCEEDED) {
      badge = "success"
    }

    return (
      <div key={project_id} className="col-6 mb-4">
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">
              <Link to={"project/" + project_id}>{title}</Link>
              <span className={"badge float-right badge-" + badge} style={{fontSize:"15px"}}>{status}</span>
            </h4>
            <div className="progress my-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                width: progress + '%'
              }}></div>
            </div>
            <div>
              {contributors} backers - {contributions} ETH backed - {deadline_for_display}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectList.propTypes = {
  project_ids: PropTypes.array,
  projects: PropTypes.object
}

ProjectList.defaultProps = {
  project_ids: []
}

export default ProjectList
