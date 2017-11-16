import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import web3 from './web3init'
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import configureStore from './store'

import BlockFund from 'contracts/BlockFund.sol';
import Project from 'contracts/Project.sol';
import BFToken from 'contracts/BFToken.sol';

import App from './App'
import ProjectListContainer from "./containers/ProjectListContainer"
import CreateProjectContainer from "./containers/CreateProjectContainer"
import ProjectDetailsContainer from "./containers/ProjectDetailsContainer"
import AccountListContainer from "./containers/AccountListContainer"


import './index.scss'

const store = configureStore()

BlockFund.setProvider(web3.currentProvider);
Project.setProvider(web3.currentProvider);
BFToken.setProvider(web3.currentProvider);

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ProjectListContainer}/>
      <Route path="create" component={CreateProjectContainer}/>
      <Route path="accounts" component={AccountListContainer}/>
      <Route path="project/:id" component={ProjectDetailsContainer}/> {/*<Route path="*" component={NoMatch}/>*/}
    </Route>
  </Router>
</Provider>, document.getElementById('root'))
