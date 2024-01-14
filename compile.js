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

  const { contracts } = JSON.parse(
    solc.compile(JSON.stringify(input))
  );

const contract = contracts['Inbox.sol'].Inbox;

// Export the entire contract object
module.exports = contract
