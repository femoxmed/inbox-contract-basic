const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

const mnemonic = process.env.CONTRACT_MNENIMICS; // Replace with your actual mnemonic
const infuraUrl = process.env.CONTRACT_URL; // Replace with your Infura URL


const provider = new HDWalletProvider(mnemonic, infuraUrl);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    const bytecode = evm.bytecode.object;
    try {
        const result = await new web3.eth.Contract(abi)
            .deploy({ data: bytecode, arguments: ['Hi there!'] })
            .send({ from: accounts[0], gas: '1000000' });

        console.log('Contract deployed to:', result.options.address);
        provider.engine.stop();
    } catch (error) {
        console.error('Deployment error:', error);
    }
};

deploy();
