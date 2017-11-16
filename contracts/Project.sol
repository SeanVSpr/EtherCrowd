pragma solidity ^0.4.2;

import "./BFToken.sol";

contract Project{
  /* Public variables */

  address public owner;
  Detail public detail;
  uint public deadline;
  mapping(address => Contributor) public contributors;
  mapping(uint => address) contributorsIndexes;
  address public token;

  /* Data types */

  enum resultTypes { pending, success, failed }
  struct Detail{
    address owner;
    bytes32 title;
    uint targetAmount;
    uint deadline;
    uint contributors;
    uint contributions;    
    resultTypes result;
    bytes extraInfo;
    uint rewardtreshold;
  }

  struct Contributor{
    uint amount;
    bool paid;
  }

  /* Events */

  event EventContribution(bytes32 activity, uint amount, uint time, address contributorAddress, address originAddress);
  event EventReward(bytes32 activity, bytes32 reward, uint time, address contributorAddress, address originAddress);

  /* Modifiers */

  modifier notCompleted() {
    if (detail.result == resultTypes.pending) _;
  }

  modifier withAddress(address _address){
    if(_address == 0) throw;
    _;
  }

  modifier withValue(){
    if(msg.value <= 0) throw;
    _;
  }

  modifier atPending(address sender){
    if(detail.result != resultTypes.pending){
      if(!sender.send(msg.value)) throw;
      EventContribution('Returned the value', msg.value, now, msg.sender, sender);
    }else{
      _;
    }
  }

  modifier atFailed(){
    if(detail.result != resultTypes.failed) throw;
    _;
  }

  modifier beforeDeadline(address sender){
    if(isTimedOut()){
      detail.result = resultTypes.failed;
      if(!sender.send(msg.value)) throw;
      EventContribution('Returned the value', msg.value, now, msg.sender, sender);
      
      refund();
    }else{
      _;
    }
  }

  /* Public functions */
  function Project(address _owner, bytes32 _title, uint _targetAmount, uint _deadline, bytes _extraInfo, uint _rewardthreshold) withAddress(_owner) {
    owner = _owner;
    if(_deadline <= 0) throw;
    if(_targetAmount <= 0) throw;
    detail = Detail(owner, _title, _targetAmount, now + _deadline, 0, 0, resultTypes.pending, _extraInfo, _rewardthreshold);
    token = new BFToken();
  }

function fund(address sender) public payable withAddress(sender) withValue() atPending(sender) beforeDeadline(sender){
    var amount = msg.value;
    if(this.balance > detail.targetAmount){
      var diff = this.balance - detail.targetAmount;
      amount = amount - diff;
      if(!sender.send(diff)) throw;
      EventContribution('Returned the diff', diff, now, msg.sender, sender);
    }
    detail.contributions = this.balance;

    if(contributors[sender].amount != 0){
      contributors[sender].amount += amount;
    }else{
      contributors[sender] = Contributor(amount, false);
      contributorsIndexes[detail.contributors] = sender;
      detail.contributors=detail.contributors+1;
    }
    EventContribution('Contributed', amount, now, sender, msg.sender);
    if(isSuccess()) payout();
  }

  function refund() private{
    for(uint i=0;i<detail.contributors;i++)
        {
            var address_c = contributorsIndexes[i];
            var contributor = contributors[address_c];

            if(contributor.paid == false){
              if(address_c.send(contributor.amount)){
                contributor.paid = true;
                EventContribution('Refunded', contributor.amount, now, address_c, msg.sender);
              } else {
                throw;
              }
            }
        }
  }

  /* Private functions  */

  function payout() private{
    detail.result = resultTypes.success;
    if(this.balance > 0){
      if(!owner.send(this.balance)){
         throw;
      } else {
        EventContribution('Paid out', detail.contributions, now, owner,msg.sender );

        for(uint i=0;i<detail.contributors;i++)
        {
            var address_c = contributorsIndexes[i];
            var contributor = contributors[address_c];

            if(contributor.amount >= detail.rewardtreshold){ 
              BFToken(token).mintToken(address_c,5);
            } 
        }
      }
    }
  }

  /* Constants */

  function isTimedOut() constant returns(bool){
    return now > detail.deadline;
  }

  function isSuccess() constant returns(bool){
    return detail.contributions == detail.targetAmount;
  }
}