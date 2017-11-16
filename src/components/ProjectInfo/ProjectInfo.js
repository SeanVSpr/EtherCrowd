import React, {Component, PropTypes} from 'react'
import web3 from "../../web3init"
import Project from "contracts/Project.sol";
import BFToken from "contracts/BFToken.sol";

class ProjectInfo extends Component {

    componentDidMount() {
        const {project} = this.props;

        console.log(Project.at(project.project_id))
        Project
            .at(project.project_id)
            .token
            .call()
            .then(t => {
                web3
                    .eth
                    .accounts.forEach(acc => {
                        BFToken
                            .at(t)
                            .getBalance
                            .call(acc)
                            .then(f => {
                                console.log(f.toNumber());
                            })
                    }, this);
            });
    }

    render() {
        const {project} = this.props;
        return (
            <div className="container my-3">
                <div className="text-center">
                    <h1>{project.title}</h1>
                    <div>Project door {project.owner}</div>
                    <div>{project.extraInfo}</div>
                    <div>Doel: {project.target_amount}</div>
                    <div>Beloning:{project.reward}</div>
                    <div>Minimale donatie voor belonging: {web3.fromWei(project.rewardtreshold.toNumber(), "ether")}</div>
                </div>
            </div>
        )
    }
}


ProjectInfo.propTypes = {
    project: PropTypes.object.isRequired
}

export default ProjectInfo
