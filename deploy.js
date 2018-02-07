const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'fit smile depart morning output latin initial pipe oval giraffe two reunion',
  'https://rinkeby.infura.io/0jtmBNCst5kwDOzznJ5a'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Payee:', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: accounts[0]});
  console.log('Deployed to:', result.options.address);
};

deploy();
