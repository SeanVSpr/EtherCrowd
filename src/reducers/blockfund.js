import * as actionTypes from "../constants/actionTypes";

const initialState = {
    projects: {},
    project_ids: [],
    loading: false
};

export default function ProjectReducer(state = initialState, action) {
    const {payload, type} = action;

    switch (type) {
        case actionTypes.PROJECTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PROJECTS_SET:
            return {
                ...state,
                projects: {...state.projects,...payload.entities.projects},
                project_ids: [...state.project_ids,...payload.result.filter(id => state.project_ids.indexOf(id) === -1)],
                loading: false
            }
        default:
            return state;
    }
}