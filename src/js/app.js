window.addEventListener('load', async () => {
// Modern dapp browsers...
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // Request account access if needed
          await ethereum.enable();
          App.initAccount();

      } catch (error) {
          console.log("Please enable access to Metamask");
      }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      App.initAccount();

  }
  // Non-dapp browsers...
  else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

App = {
  Web3Provider: null,
  contracts: {},

  initAccount: function() {

    App.web3Provider = web3.currentProvider;
    // Display current wallet
    var account = web3.eth.accounts[0];

    var accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== account) {
        account = web3.eth.accounts[0];
        window.location.reload(true);
      }
    }, 100);

    document.getElementById("account").innerHTML = account;

    // Display current wallet ETH balance
    var accountWeiBalance = web3.eth.getBalance(account, function(error, result) {
      if (!error) {
        console.log(JSON.stringify(result));

        var accountBalance = web3.fromWei(result.toNumber(), "ether");
        document.getElementById("account_balance").innerHTML = accountBalance;

      } else {
        console.log(error);
      }
    });

    // Display status of current wallet i.e. admin privileges

    return App.initContract();
  },


  initContract: function() {
    $.getJSON('Marketplace.json', function(data) {
      //Get the necessary contract artifact file and instantiate it with truffle-contract
      var MarketplaceArtifact = data;
      App.contracts.Marketplace = TruffleContract(MarketplaceArtifact);

      // Set the provider for this contracts
      App.contracts.Marketplace.setProvider(App.web3Provider);

      return App.getStoreId();

    });

    return App.bindEvents();

  }
};
