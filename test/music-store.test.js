var MusicStore = artifacts.require('MusicStore')

contract('MusicStore', function(accounts) {

  const owner = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]
  const emptyAddress = "0x0000000000000000000000000000000000000000"

  /*
    Test 1: Tests whether an address can purchase
  */

  it("should purchase the release", async() =>{

    const musicstore = await MusicStore.deployed({from: owner})

    var eventEmitted = false

    var event = musicstore.ReleasePurchased()
    await event.watch((err,res) => {
      eventEmitted = true
    })

    var amount = web3.toWei(1, "ether")

    await musicstore.buyRelease({from: alice, value: amount})

    assert.equal(eventEmitted, true, "buying the release should emit an event")

  })


});
