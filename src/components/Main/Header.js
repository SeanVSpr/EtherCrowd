import React, {Component} from 'react'
import {IndexLink} from "react-router"

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                <div className="container">
                    <button
                        className="navbar-toggler navbar-toggler-right"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <IndexLink to="/" className="navbar-brand">BlockFund</IndexLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <IndexLink to="/" className="nav-link" activeClassName="active">Overzicht</IndexLink>
                            </li>
                            <li className="nav-item">
                                <IndexLink to="accounts" className="nav-link" activeClassName="active">Accounts</IndexLink>
                            </li>
                        </ul>
                    </div>
                    <div className="my-md-0">
                        <IndexLink to="create" className="btn btn-primary" activeClassName="active">Nieuw project</IndexLink>
                    </div>
                </div>
            </nav>

        )
    }
}

export default Header