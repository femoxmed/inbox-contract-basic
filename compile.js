const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

const content = fs.readFileSync(contractPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': { content }
    },
    settings: {
      outputSelection: { '*': { '*': ['*'] } }
    }
  };
console.log(JSON.parse(solc.compile(JSON.stringify(input))))
// Export the entire contract object
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Inbox.sol'
].Inbox;
