import React, { Component } from 'react'

class AccountList extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr><td>Account</td><td>ETH</td></tr>
        </thead>
        <tbody>
          {this.props.accounts.map(this.renderAccount)}
        </tbody>
      </table>
    )
  }
  renderAccount({account,token, balance}) {
    return <tr key={account}><td>{account}</td><td>{balance}</td></tr>
  }
}
export default AccountList