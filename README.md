# heather

Heather is a platform for sharing resources within local communities to minimize environmental impact.

It uses Vue, Vuex, Nuxt, Bootstrap, SCSS, Solidity and the Hedera JavaScript SDK.

## Testing tips

Demo website: [heather.codesparks.nl](https://heather.codesparks.nl)

Please keep in mind that form validation is not yet fully implemented. In general, it is always best to fill in all form fields.

Other tips:

- Choose a location in the city center of Leiden to see dummy data. (e.g. 'Burcht van Leiden')
- In the registration form, always choose a location from the Google dropdown box.
- In the Hashpack browser extension, always choose the testnet wallet that is listed **first** if you have multiple testnet wallets.

You can always update your location and other account details on the Account page.

If you want to test the borrowing functionality using two accounts, you can use your Hashpack wallet for one user and the demo account for the other user. Or you can use two Hashpack extensions in two different browsers (e.g. Chrome and Brave). Currently, it is also possible to borrow your own items so you can also test using only one account, but this might get a bit confusing.

Email notifications are not yet implemented, so you have to manually **copy the url of your borrow request** and send it to the person you wish to borrow from.

## Navigating the repository

We use the default nuxt directory structure for the front-end. Most of the front-end implementation can be found in `/pages` and `/components`. The decentralized data storage is handled using the scripts in `/utils/storage`. Both the original and the compiled smart contracts can be found in `/utils/contracts`, which are deployed on the Hedera testnet using `/utils/deployContract.js`. The interactions with the Hedera Javascript SDK can be found in `/utils/borrow.js` which uses helper functions we defined in `/utils/hederaService.js`.

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
