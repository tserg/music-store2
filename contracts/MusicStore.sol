pragma solidity ^0.5.8;

contract MusicStore {

  // set owner

  address payable public owner;

  // circuit break

  bool public stopped = false;


  /*
    trackCount: total number of tracks
    releasePrice: price of release
  */

  uint public releasePrice;

  /*
    purchaserList: addresses who have already bought the purchase
  */

  mapping (address => uint) public purchaserList;

  event ReleasePurchased(address purchaser, uint price);

  modifier verifyHasNotPurchased (address purchaser) { require(purchaserList[purchaser] == 0); _;}

  modifier paidEnough {require(msg.value >= releasePrice); _;}

  modifier stopInEmergency { require(!stopped); _;}

  constructor() public {
    owner = msg.sender;
    releasePrice = 10000000000000000;
  }

  /** @dev Buy release
    */

  function buyRelease()
    public
    payable
    verifyHasNotPurchased(msg.sender)
    paidEnough()
  {
    purchaserList[msg.sender] = 1;
    emit ReleasePurchased(msg.sender, msg.value);

  }

  /** @dev Send funds to owner
    */

  function claimFunds()
    public
  {
      owner.transfer(address(this).balance);
  }

}
