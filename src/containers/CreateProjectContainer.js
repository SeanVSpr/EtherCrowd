import React, {Component} from 'react'
import BlockFund from 'contracts/BlockFund.sol';
import Project from 'contracts/Project.sol';
import web3 from '../web3init'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {push} from 'react-router-redux'

class createProjectContainer extends Component {
    constructor(props) {
        super(props);

        this.handleSend = this
            .handleSend
            .bind(this);
    }

    handleSend(e) {
        const {push} = this.props;
        e.preventDefault()
        if (!this.titleInput || !this.goalAmountInput || !this.durationInput) 
            return;
        const acc = web3.eth.accounts[0];
        web3.eth.defaultAccount = acc;
        // Mogelijkheid 1
        Project.new(acc, web3.fromUtf8(this.titleInput.value), web3.toWei(this.goalAmountInput.value), 60 * 60 * 24 * this.durationInput.value, web3.fromUtf8(this.extraInfoInput.value), web3.toWei(this.rewardthresholdinput.value), {
            from: acc,
            gas: 3000000
        }).then(p => {
            console.log(p)
            BlockFund
                .deployed()
                .addProject
                .sendTransaction(p.address)
                .then(e => {
                    push("/");
                })
        })

        // Mogelijkheid 2
        /*BlockFund
            .deployed()
            .createProject
            .sendTransaction(web3.fromUtf8(this.titleInput.value), web3.toWei(this.goalAmountInput.value), this.durationInput.value, {
                from: acc,
                gas: 1000000
            })
            .then((e,b) => {
                var transaction = web3.eth.getTransaction(e);
                console.log(e);
                console.log('b',b);
                console.log('t',transaction);
                push("/");
            })*/

    }

    render() {
        return (
            <div className="container mt-4">
                <h2>Create campagne</h2>
                <form className='SendCoin'>
                    <div className="form-group">
                        <label htmlFor='title'>Titel</label>
                        <input
                            className="form-control"
                            id='title'
                            type='text'
                            ref={(i) => {
                            if (i) {
                                this.titleInput = i
                            }
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='goal_amount'>Doel</label>
                        <input
                            className="form-control"
                            id='goal_amount'
                            type='number'
                            ref={(i) => {
                            if (i) {
                                this.goalAmountInput = i
                            }
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor='duration'>Lengte (in dagen)</label>
                        <input
                            className="form-control"
                            id='duration'
                            type='number'
                            ref={(i) => {
                            if (i) {
                                this.durationInput = i
                            }
                        }}/>
                    </div>

                    <div className="form-group">

                        <label htmlFor='extraInfo'>Extra informatie</label>
                        <textarea
                            className="form-control"
                            id="extraInfo"
                            ref={(i) => {
                            if (i) {
                                this.extraInfoInput = i
                            }
                        }}
                            rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor='rewardthreshold'>Minimale donatie om een beloning te verkrijgen</label>
                        <input
                            className="form-control"
                            id='rewardthreshold'
                            type='number'
                            ref={(i) => {
                            if (i) {
                                this.rewardthresholdinput = i
                            }
                        }}/>
                    </div>
                    <button className='btn btn-primary' onClick={this.handleSend}>Aanmaken</button>
                </form>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        push
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(createProjectContainer)