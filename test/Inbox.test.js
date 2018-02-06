const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //constructor
const provider = ganache.provider(); //instance
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

//Mocha Structure: Deploy -> Manipulate -> Make an assertion -> repeat
// beforeEach(() => {
//   //Get a list of all accounts.
//   //Almost all web3 functions are asynchronous.
//   web3.eth.getAccounts()
//     .then(fetchedAccounts => {
//       console.log(fetchedAccounts);
//     });
let accounts;
let inbox;
beforeEach(async () => {
  //Get a list of all accounts.
  //Almost all web3 functions are asynchronous.
  accounts = await web3.eth.getAccounts();

  //Use one of those accounts to deploy the contract!d
  //Contract here is a constructor function.
  //JSON.parse(interface) === ABI : this is the intermediary b/w JS and SOL.
  //inbox represents what exists on Blockchain.
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    //deploys a new object.
    .deploy({ data: bytecode, arguments: ['Hi there!']})
    //instructs web3 to send out a transaction that creates this contract.
    .send({ from: accounts[0], gas: '1000000'});
  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', ()=>{
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  })
})
