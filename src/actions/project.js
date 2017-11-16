import fetchProjects from "../api/fetchProjects"
import * as actionTypes from "../constants/actionTypes"
import {PROJECT_STATUS} from "../constants"
import {normalize, schema} from "normalizr"
import web3 from "../web3init"
import BlockFund from 'contracts/BlockFund.sol';

const ProjectSchema = new schema.Entity("projects", {}, {idAttribute: 'project_id'})

export function getProjects() {
    return dispatch => {
        dispatch({
            type: actionTypes.PROJECTS_LOADING
        })
        return fetchProjects().then(projects => {
            projects.forEach(project => {
                if(project.ended && project.status === PROJECT_STATUS.PENDING){
                    dispatch(contribute(project.project_id,web3.eth.accounts[0],0.000001))
                }
            })
            return dispatch({
                type: actionTypes.PROJECTS_SET,
                payload: normalize(projects, new schema.Array(ProjectSchema))
            })
        })
    }
}

export function contribute(project_id, account, amount) {
    return dispatch => {
        const instance = BlockFund.deployed();
            console.log(account);
        return instance
            .contribute
            .sendTransaction(project_id, {
                value: web3.toWei(amount),
                from: account,
                gas: 1000000
            })
            .then(function () {
                dispatch(getProjects());
            });
    }
}