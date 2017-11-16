import BlockFund from 'contracts/BlockFund.sol';
import Project from "contracts/Project.sol";
import web3 from '../web3init';
import moment from 'moment';
import {getStatus} from '../utils';

export default function fetchProjects() {
  let project_addresses = [];
  const blockFundInstance = BlockFund.deployed();

  // Get # of projects in BlockFund
  return blockFundInstance
    .numOfProjects
    .call()
    // Iterate through project addresses in BlockFund
    .then(numOfProjects => {
      var allRequests = [];
      for (var index = 0; index < numOfProjects; index++) {
        allRequests.push(blockFundInstance.projects.call(index));
      }
      return Promise.all(allRequests);
    })
    // Get details of all projects on given addresses
    .then(addresses => {
      project_addresses = addresses;

      return Promise.all(addresses.map((project_address) => {
        var project = Project.at(project_address);
        return project
          .detail
          .call();
      }));

    })
    .then(details => {
      return details.map((detail, index) => {
        var d = new Date((detail[3]) * 1000);
        var ended = false;
        var now = new Date();
        if ((d - now) < 0) {
          ended = true;
        }

        return {
          project_id: project_addresses[index],
          owner: detail[0],
          title: web3.toUtf8(detail[1]),
          target_amount: parseFloat(web3.fromWei(detail[2], 'ether')),
          deadline_in_second: d,
          deadline_for_display: !ended ? moment(d).fromNow() : null,
          contributors: detail[4].toNumber(),
          contributions: parseFloat(web3.fromWei(detail[5], 'ether')),
          status: getStatus(detail[6].toNumber()),
          rewardtreshold: detail[8],
          ended: ended,
          progress: (detail[5] / detail[2]) * 100,
          extraInfo: web3.toUtf8(detail[7])
        }
      })
    })
};