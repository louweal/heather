# heather

Heather is a platform for sharing resources within local communities to minimize environmental impact. It uses vue, nuxt, bootstrap and the Hedera SDK.

## Navigating the repository

We use the default nuxt directory structure for the front-end. Most of the front-end implementation can be found in `/pages` and in `/components`. The decentralized data storage is handled using the scripts in `/utils/storage`. Both the original and the compiled smart contracts can be found in `/utils/contracts`, which are deployed to the Hedera testnet using `/utils/deployContract.js`. The interactions with the Hedera Javascript SDK can be found in `/utils/borrow.js` which uses some helper functions we defined in `/utils/hederaService.js`.

## Setup

### 1. Add testnet credentials

Add your testnet credentials to .env, which is located in the root directory.

```
MY_ACCOUNT_ID=
MY_PRIVATE_KEY=
```

Also add .env to .gitignore if your planning to push to Git!

### Install dependencies (once)

```
npm i
```

### Build for development

```
npm run dev
```

### Or build for production (target = static)

```
npm run generate
npm run start
```

And that's it!

## Deploying contracts

Only needed if you want to make changes to the contracts.

The Solidity contracts are compiled to using `solcjs` (this is not a project dependency, you need to install it manually).
After installation, go to the `utils/contracts` directory and run:

```
solcjs --bin ContractFileName.sol
```

Next, deploy the bytecode on Hedera from the root directory of the project. Make sure you change the Contract filename on line 21 in the script to the file you wish to deploy.

```
node utils/deployContract.js
```
