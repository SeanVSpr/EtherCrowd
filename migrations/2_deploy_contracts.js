/*
var BlockFund = artifacts.require("BlockFund.sol");*/

module.exports = function(deployer) {
  deployer.deploy(BlockFund);
  deployer.deploy(BFToken);
};
