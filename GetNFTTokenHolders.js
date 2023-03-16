const near = require('near-api-js');
const nearConfig = require('./nearConfig'); // Your NEAR configuration file
const contractId = 'bluntdao.snft.near'; // The contract ID for the NFT contract
const tokenId = 1; // The ID of the NFT for which you want to fetch token holders

async function getAllTokenHolders() {
  const nearInstance = await near.connect({
    deps: { keyStore: new near.KeyStore.KeyStore(nearConfig.keyPath) },
    ...nearConfig
  });

  const contract = await nearInstance.contract(contractId);

  // First, get the owner of the NFT with the given ID
  const owner = await contract.get_token_owner({ token_id: tokenId });

  // Next, get all tokens in the contract
  const tokens = await contract.nft_tokens({ from_index: 0, limit: 1000 });

  // Loop through the tokens and get their owners
  const tokenHolders = new Set([owner]);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const holder = await contract.get_token_owner({ token_id: token.token_id });
    tokenHolders.add(holder);
  }

  return Array.from(tokenHolders);
}

getAllTokenHolders().then((holders) => {
  console.log('Token holders:', holders);
}).catch(console.error);
