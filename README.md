<div align="center">
  <img alt="lisk-hd-key" src="https://raw.githubusercontent.com/alepop/lisk-hd-key/master/logo.svg" height="109px" />
</div>

Lisk HD Key
============
[![Coverage Status](https://coveralls.io/repos/github/alepop/lisk-hd-key/badge.svg?branch=master)](https://coveralls.io/github/alepop/lisk-hd-key?branch=master)
A Typescript based module that provides addition functionality for the Key Derivation in the Lisk ecosystem.

Installation
------------

    npm i --save @lisk-builders/lisk-hd-key


Examples
-----

**getPublicKey(path, seed)** <br>
In this example we will get the public key for a Lisk address. The function should get the hexadecimal value of the given BIP39 seed.

`seed`   A 256 bits hexadecimal string.
> 06bae687f0250ab9533be2ac9717ae2a802d69c97d5..

`path`  Derived from [BIP0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) we use the same pattern. Extra information on the what and why of the parameter can be found on the given url.

> m / purpose' / coin_type' / account' / change' / address_index'

**NOTE**: Every Lisk wallet that provides hardware wallet integration are simply using the following derivation:

> m / purpose' / coin_type' / account'

**Usage**

```js
const { getPublicKey } = require('lisk-hd-key');

const bip39 = require('bip39');
const path = "m/44'/134'/0'";

const doPubKeyTest = async () => {
    const seed = bip39.generateMnemonic();
    // or custom seed
    // const seed = "future dose defense ..."

    // 18e48e187b700d4596983f2efaf64f63c31ff13b4537abea1157bdf45c1fc9e5c5d8a817048616d24dcd0b7ae638df786cec2dc0749f6847724905988ae56b0e
    const hexSeed = await bip39.mnemonicToSeed(seed);
    
    // <Buffer e7 7d a0 2e 45 ec 11 a3 69 70 58 2e ad 68 11 e2 78 79 7a 14 f3 15 a0 a6 9a 3e fe 9f 6c 76 24 b6>
    const publicKey = getPublicKey(path, hexSeed);
    console.info('publicKey', publicKey);
    console.info('publicKey hex', publicKey.toString('hex'));
    
}

doPubKeyTest();
```
<br>

**signTransaction( seed, path, transaction, networkId = liskMainnet )** <br>
In this example we will sign a transaction. Signing a transaction means that nobody can alter the content of the transaction without invalidating your signature.

`seed`  A 256 bits hexadecimal string.
Ex:
> 06bae687f0250ab9533be2ac9717ae2a802d69c97d5..

`path`  Derived from [BIP0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) we use the same pattern. Extra information on the what and why of the parameter can be found on the given url.

> m / purpose' / coin_type' / account' / change' / address_index'

**NOTE**: Every Lisk wallet that provides hardware wallet integration are simply using the following derivation:

> m / purpose' / coin_type' / account'

The apostrophe means that the index is hardened.

`transaction`
This parameter is a [Lisk transaction object](https://lisk.com/documentation/lisk-sdk/guides/node-management/signing-transactions-offline.html). It can have the same properties as a transaction described in the given url.

`networkId` (Lisk mainnet if not provided)
the network identifier (as string) of the target chain. By default Lisk Mainnet is used.
Ex:
> 4c09e6a781fc4c7bdb936ee815de8f94190f8a7519becd9de2081832be309a99"
> 
(Lisk Mainnet)

**Usage**

```js
const { getPublicKey, signTransaction, getBroadcastBytes } = require('lisk-hd-key');

const bip39 = require('bip39');
const path = "m/44'/134'/0'";


const doSignTest = async () => {
    const seed = bip39.generateMnemonic();
    // or with your seed
    // const seed = "bread stock include ...";
    
    // ex: 18e48e187b700d4596983f2efaf64f63c31ff13b4537abea1157bdf45c1fc9e5c5d8a817048616d24dcd0b7ae638df786cec2dc0749f6847724905988ae56b0e
    const hexSeed = await bip39.mnemonicToSeed(seed);
    
    // ex: <Buffer e7 7d a0 2e 45 ec 11 a3 69 70 58 2e ad 68 11 e2 78 79 7a 14 f3 15 a0 a6 9a 3e fe 9f 6c 76 24 b6>
    const publicKey = getPublicKey(path, hexSeed);
    // ex: <Buffer ad 68 11 e2 78 79 7a 14 f3 15 a0 a6 9a 3e fe 9f 6c 76 24 b6>
    const address = cryptography.getAddressFromPublicKey(publicKey);

    const unsignedTransaction = {
        moduleID: 2,
        assetID: 0,
        nonce: BigInt(3),
        fee: BigInt(100000),
        senderPublicKey: publicKey, // If not provided, it will be set automatically
        asset: {
            amount: BigInt(100000000),
            recipientAddress: address, // self-transfer
            data: '',
        }
    };

    // tx to be broadcasted
    const signedTransaction = signTransaction(hexSeed, path, unsignedTransaction);
    // get bytes to be broadcasted
    const txBroadcastBytes = getBroadcastBytes(signedTransaction);
}

doSignTest();
```

Tests
-----
```
npm test
```

References
----------

 - Universal private key derivation - [SLIP-0010](https://github.com/satoshilabs/slips/blob/master/slip-0010.md)
 - Hierarchical Deterministic Wallets- [BIP-0032](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
 - Multi-Account Hierarchy for Deterministic Wallets - [BIP-0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
