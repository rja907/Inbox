const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //constructor
const web3 = new Web3(ganache.provider()); //instance

//Mocha Structure: Deploy -> Manipulate -> Make an assertion -> repeat
// beforeEach(() => {
//   //Get a list of all accounts.
//   //Almost all web3 functions are asynchronous.
//   web3.eth.getAccounts()
//     .then(fetchedAccounts => {
//       console.log(fetchedAccounts);
//     });
let accounts;
beforeEach(async () => {
  //Get a list of all accounts.
  //Almost all web3 functions are asynchronous.
  accounts = await web3.eth.getAccounts();

  //Use one of those accounts to deploy the contract!
});

describe('Inbox', () => {
  it('deploys a contract', ()=>{
    console.log(accounts);
  })
})
