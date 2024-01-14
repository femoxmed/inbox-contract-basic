const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
// const { bytecode, interface } = require('../compile')
const { abi, evm } = require('./compile');
const bytecode = evm.bytecode.object;
const web3 = new Web3(ganache.provider());
let accounts;
let inbox;
const initial_message = 'Hi there!'
beforeEach(async () => {
    //get a list of account
    accounts  = await web3.eth.getAccounts()
        
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode, arguments: [initial_message] })
        .send({ from: accounts[0], gas: '1000000'})

    //use one fo those accounts to deploy the contracts
});

describe("Inbox", () => {
    it('deploys a contract', () => {
        console.log(inbox);
        assert.ok(inbox.options.address)
    });

    it('It has an initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initial_message)
    })

    it('Updates message attribute', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    })
});
