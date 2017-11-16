pragma solidity ^0.4.2;

import './Project.sol';
//import './BFToken.sol';

contract BlockFund {
  address[] public projects;

  function BlockFund() {
    // constructor
  }

  /*
    This function should allow a user to add a new project to the BlockFund.
    The function should deploy a new Project contract and keep track of its address.
    The createProject() function should accept all constructor values that the Project contract requires.
  */
  function createProject(bytes32 _title, uint _targetAmount, uint _deadline, bytes _extraInfo, uint _rewardtreshold) public{
      projects.push(new Project(msg.sender, _title, _targetAmount, _deadline,_extraInfo, _rewardtreshold));
  }
  
  function addProject(address project) public{
      projects.push(project);
  }

  /*
    This function allows users to contribute to a Project identified by its address.
    contribute calls the fund() function in the individual Project contract
    and passes on all value attached to the function call.
  */

  function contribute(address projectAddress) public payable{
    Project(projectAddress).fund.value(msg.value)(msg.sender);
  }

  function numOfProjects() public constant returns (uint){
    return projects.length;
  }
}