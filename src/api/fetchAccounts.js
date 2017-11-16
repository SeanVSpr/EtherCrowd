import web3 from '../web3init';

export default function getAccounts() {
    return new Promise(resolve => {
        web3
            .eth
            .getAccounts((error, result) => {
                resolve(result);
            })
    })
}