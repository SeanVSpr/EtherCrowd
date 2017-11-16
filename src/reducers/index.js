import {combineReducers} from 'redux'
import blockfund from './blockfund'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
    routing: routerReducer,
    blockfund/*,
    change: (state = false, action) => {
        return !state
    }*/
})

export default rootReducer