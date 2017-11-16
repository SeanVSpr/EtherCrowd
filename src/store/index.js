import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux'
import {browserHistory} from 'react-router'

const logger = createLogger({level: 'info', collapsed: true});

const middleware = [thunkMiddleware, routerMiddleware(browserHistory)];

// eslint-disable-next-line
if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
}

// eslint-disable-next-line
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators,
        // serialize...
    })
    : compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore)

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module
            .hot
            .accept('../reducers', () => {
                const nextRootReducer = require('../reducers/index').default

                store.replaceReducer(nextRootReducer)
            })
    }

    return store
}