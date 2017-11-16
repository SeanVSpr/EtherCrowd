import React, {Component, PropTypes} from 'react'
import Project from 'contracts/Project.sol';
import BFToken from 'contracts/BFToken.sol';
import web3 from "../web3init"

class ProjectActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        const {id} = this.props;
        const {activities} = this.state;

        const project = Project.at(id);

        const watch = (err, result) => {
            console.log("event",result);
            activities.push({
                id: result.transactionHash + "-" + Math.random(),
                activity: web3.toUtf8(result.args.activity),
                amount: parseFloat(web3.fromWei(result.args.amount, 'ether')),
                time: result.args.time,
                originAddress: result.args.originAddress,
                contributor: result.args.contributorAddress
            });
            if (this.refs.activities) {
                this.setState({activities: activities})
            }
        };

        // Watch for events at current project block
        project
            .allEvents({fromBlock: 0})
            .watch(watch);

        // Watch for events at current token block
        project
            .token
            .call()
            .then(t => {
                BFToken
                    .at(t)
                    .allEvents({fromBlock: 0})
                    .watch(watch);
            })
    }

    render() {

        if (!this.state.activities) 
            return null;
        
        return (
            <div className="my-4" ref="activities">
                <h3>Activiteit</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Activiteit</td>
                            <td>Bedrag (in ETH)</td>
                            <td>Adres</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this
                            .state
                            .activities
                            .map((activity) => {
                                return (
                                    <tr key={activity.id}>
                                        <td>{activity.activity}</td>
                                        <td>{activity.amount}</td>
                                        <td>{activity.contributor}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}

ProjectActivity.propTypes = {
    id: PropTypes.string.isRequired
}

export default ProjectActivity