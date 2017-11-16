import React, {Component} from 'react'
import AccountList from '../components/AccountList'
import web3 from "../web3init"
import fetchAccounts from "../api/fetchAccounts"

class AccountListContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: []
        }
    }
    componentDidMount() {
        //var meta = BFToken.deployed();
        
        fetchAccounts().then(accs => {

              this.setState({
                        accounts:  accs.map(acc => { 
                    return { 
                        account: acc, 
                        balance: web3.fromWei(web3.eth.getBalance(acc), "ether").toNumber() 
                    } 
                }) 


                    })
        })
    }
    render() {
        return (
            <div className="container mt-4">
                <AccountList accounts={this.state.accounts}/>
            </div>
        )
    }
}
export default AccountListContainer