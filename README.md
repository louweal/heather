# heather

Heather is a platform for sharing resources within local communities to minimize environmental impact. It uses vue, nuxt, bootstrap and the Hedera SDK.

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

## Additional information

Only needed if you want to make changes to the contracts.

## Deploying contracts

The Solidity contracts are compiled to using `solcjs` (this is not a project dependency, you need to install it manually).
After installation, go to the contracts directory and run:

```
cd utils/contracts
solcjs --bin ContractFileName.sol

```

Next, deploy the bytecode on Hedera. Make sure you change the Contract filename on line 21 in the script.

```
cd ../..
node utils/deployContract.js
```
